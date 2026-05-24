const CACHE_TTL_MS = 5 * 60 * 1000;
const externalJobsCache = new Map();

const providerEnvConfig = {
  usajobs: ["USAJOB_API_KEY", "USAJOB_USER_AGENT"],
  adzuna: ["ADZUNA_APP_ID", "ADZUNA_APP_KEY"],
  rapidapi: ["RAPIDAPI_KEY"],
  muse: ["MUSE_API_KEY"],
  findwork: ["FINDWORK_API_KEY"],
  jooble: ["JOOBLE_API_KEY"],
};

const getMissingEnvKeys = (provider) => {
  const requiredKeys = providerEnvConfig[provider] || [];
  return requiredKeys.filter((key) => !process.env[key]);
};

const normalizeText = (value, fallback = "") => {
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
};

const normalizeExternalJob = (provider, rawJob, index = 0) => {
  const defaults = {
    _id: `${provider}-${rawJob?.id || rawJob?.job_id || rawJob?.slug || index}`,
    source: provider,
    isExternal: true,
    title: "Untitled role",
    description: "",
    requirements: [],
    salary: 0,
    location: "Remote",
    jobType: "N/A",
    experienceLevel: 0,
    position: 1,
    applications: [],
    company: {
      name: "External Company",
      logo: "",
    },
    createdAt: new Date().toISOString(),
    externalUrl: "",
  };

  if (provider === "usajobs") {
    const descriptor = rawJob?.MatchedObjectDescriptor || {};
    return {
      ...defaults,
      _id: `${provider}-${descriptor?.PositionID || index}`,
      title: normalizeText(descriptor?.PositionTitle, defaults.title),
      description: normalizeText(descriptor?.QualificationSummary, defaults.description),
      location: normalizeText(
        descriptor?.PositionLocationDisplay || descriptor?.PositionLocation?.[0]?.LocationName,
        defaults.location
      ),
      company: { name: normalizeText(descriptor?.OrganizationName, defaults.company.name), logo: "" },
      salary: Number(descriptor?.PositionRemuneration?.[0]?.MaximumRange || 0),
      jobType: normalizeText(descriptor?.PositionSchedule?.[0]?.Name, defaults.jobType),
      experienceLevel: Number(descriptor?.PositionOfferingType?.[0]?.Code || 0),
      externalUrl: normalizeText(descriptor?.PositionURI, ""),
      createdAt: descriptor?.PublicationStartDate || defaults.createdAt,
    };
  }

  if (provider === "adzuna") {
    return {
      ...defaults,
      _id: `${provider}-${rawJob?.id || index}`,
      title: normalizeText(rawJob?.title, defaults.title),
      description: normalizeText(rawJob?.description, defaults.description),
      location: normalizeText(rawJob?.location?.display_name, defaults.location),
      company: { name: normalizeText(rawJob?.company?.display_name, defaults.company.name), logo: "" },
      salary: Number(rawJob?.salary_max || rawJob?.salary_min || 0),
      jobType: normalizeText(rawJob?.contract_time || rawJob?.contract_type, defaults.jobType),
      externalUrl: normalizeText(rawJob?.redirect_url, ""),
      createdAt: rawJob?.created || defaults.createdAt,
    };
  }

  if (provider === "rapidapi") {
    return {
      ...defaults,
      _id: `${provider}-${rawJob?.job_id || index}`,
      title: normalizeText(rawJob?.job_title, defaults.title),
      description: normalizeText(rawJob?.job_description, defaults.description),
      location: normalizeText(rawJob?.job_city || rawJob?.job_country, defaults.location),
      company: { name: normalizeText(rawJob?.employer_name, defaults.company.name), logo: "" },
      salary: Number(rawJob?.job_min_salary || rawJob?.job_max_salary || 0),
      jobType: normalizeText(rawJob?.job_employment_type || defaults.jobType),
      externalUrl: normalizeText(rawJob?.job_apply_link || ""),
      createdAt: rawJob?.job_posted_at_datetime_utc || defaults.createdAt,
    };
  }

  if (provider === "muse") {
    return {
      ...defaults,
      _id: `${provider}-${rawJob?.id || index}`,
      title: normalizeText(rawJob?.name, defaults.title),
      description: normalizeText(rawJob?.contents, defaults.description),
      location: normalizeText(rawJob?.locations?.[0]?.name, defaults.location),
      company: { name: normalizeText(rawJob?.company?.name, defaults.company.name), logo: "" },
      jobType: normalizeText(rawJob?.type, defaults.jobType),
      externalUrl: normalizeText(rawJob?.refs?.landing_page || ""),
      createdAt: rawJob?.publication_date || defaults.createdAt,
    };
  }

  if (provider === "findwork") {
    return {
      ...defaults,
      _id: `${provider}-${rawJob?.id || index}`,
      title: normalizeText(rawJob?.role, defaults.title),
      description: normalizeText(rawJob?.text, defaults.description),
      location: normalizeText(rawJob?.location, defaults.location),
      company: { name: normalizeText(rawJob?.company_name, defaults.company.name), logo: "" },
      externalUrl: normalizeText(rawJob?.url || rawJob?.apply_url || ""),
      createdAt: rawJob?.date_posted || defaults.createdAt,
      jobType: rawJob?.remote ? "Remote" : defaults.jobType,
    };
  }

  if (provider === "jooble") {
    return {
      ...defaults,
      _id: `${provider}-${rawJob?.id || index}`,
      title: normalizeText(rawJob?.title, defaults.title),
      description: normalizeText(rawJob?.snippet, defaults.description),
      location: normalizeText(rawJob?.location, defaults.location),
      company: { name: normalizeText(rawJob?.company, defaults.company.name), logo: "" },
      salary: Number(rawJob?.salary || 0),
      jobType: normalizeText(rawJob?.type, defaults.jobType),
      externalUrl: normalizeText(rawJob?.link || ""),
      createdAt: rawJob?.updated || defaults.createdAt,
    };
  }

  return defaults;
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`External API request failed (${response.status}): ${errorText || response.statusText}`);
  }
  return response.json();
};

const providerHandlers = {
  usajobs: async ({ keyword = "", location = "", page = "1" }) => {
    const query = new URLSearchParams({
      Keyword: keyword,
      LocationName: location,
      Page: page,
    }).toString();

    const data = await fetchJson(`https://data.usajobs.gov/api/search?${query}`, {
      headers: {
        Host: "data.usajobs.gov",
        "User-Agent": process.env.USAJOB_USER_AGENT,
        "Authorization-Key": process.env.USAJOB_API_KEY,
      },
    });

    return data?.SearchResult?.SearchResultItems || [];
  },
  adzuna: async ({ keyword = "", location = "", page = "1", perPage = "10" }) => {
    const query = new URLSearchParams({
      app_id: process.env.ADZUNA_APP_ID,
      app_key: process.env.ADZUNA_APP_KEY,
      what: keyword,
      where: location,
      results_per_page: perPage,
    }).toString();
    const data = await fetchJson(`https://api.adzuna.com/v1/api/jobs/us/search/${page}?${query}`);
    return data?.results || [];
  },
  rapidapi: async ({ keyword = "", page = "1" }) => {
    const query = new URLSearchParams({
      query: keyword || "software engineer",
      page,
      num_pages: "1",
    }).toString();
    const data = await fetchJson(`https://jsearch.p.rapidapi.com/search?${query}`, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });
    return data?.data || [];
  },
  muse: async ({ page = "1", location = "", keyword = "" }) => {
    const query = new URLSearchParams({
      page,
      location,
      category: keyword,
      api_key: process.env.MUSE_API_KEY,
    }).toString();
    const data = await fetchJson(`https://www.themuse.com/api/public/jobs?${query}`);
    return data?.results || [];
  },
  findwork: async ({ keyword = "", location = "", page = "1" }) => {
    const query = new URLSearchParams({
      search: keyword,
      location,
      page,
    }).toString();
    const data = await fetchJson(`https://findwork.dev/api/jobs/?${query}`, {
      headers: {
        Authorization: `Token ${process.env.FINDWORK_API_KEY}`,
      },
    });
    return data?.results || [];
  },
  jooble: async ({ keyword = "", location = "", page = "1" }) => {
    const data = await fetchJson(`https://jooble.org/api/${process.env.JOOBLE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords: keyword,
        location,
        page: Number(page) || 1,
      }),
    });
    return data?.jobs || [];
  },
};

const resolveProviders = (query) => {
  const provider = query.provider?.toLowerCase();
  const providers = query.providers
    ?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const aggregateRequested = query.aggregate === "true";

  if (provider) return [provider];
  if (providers?.length) return providers;
  if (aggregateRequested) return Object.keys(providerHandlers);
  return [];
};

export const getExternalJobs = async (req, res) => {
  try {
    const selectedProviders = resolveProviders(req.query);
    if (!selectedProviders.length) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid provider query (provider=<name>), providers=<name1,name2>, or aggregate=true.",
      });
    }

    const invalidProviders = selectedProviders.filter((provider) => !providerHandlers[provider]);
    if (invalidProviders.length) {
      return res.status(400).json({
        success: false,
        message: `Unsupported provider(s): ${invalidProviders.join(", ")}`,
      });
    }

    const cacheKey = JSON.stringify({ providers: selectedProviders, query: req.query });
    const cached = externalJobsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.status(200).json({
        success: true,
        fromCache: true,
        jobs: cached.jobs,
        providerResults: cached.providerResults,
      });
    }

    const providerResults = [];
    const jobs = [];

    for (const provider of selectedProviders) {
      const missingEnvKeys = getMissingEnvKeys(provider);
      if (missingEnvKeys.length) {
        providerResults.push({
          provider,
          success: false,
          message: `Missing required environment variables: ${missingEnvKeys.join(", ")}`,
          jobs: [],
        });
        continue;
      }

      try {
        const rawJobs = await providerHandlers[provider](req.query);
        const normalizedJobs = rawJobs.map((rawJob, index) => normalizeExternalJob(provider, rawJob, index));
        jobs.push(...normalizedJobs);
        providerResults.push({
          provider,
          success: true,
          jobsCount: normalizedJobs.length,
        });
      } catch (error) {
        providerResults.push({
          provider,
          success: false,
          message: error.message || "Failed to fetch jobs from provider.",
          jobs: [],
        });
      }
    }

    if (!jobs.length && providerResults.every((item) => !item.success)) {
      return res.status(400).json({
        success: false,
        message: "External jobs could not be fetched. Check provider credentials and request parameters.",
        providerResults,
        jobs: [],
      });
    }

    externalJobsCache.set(cacheKey, {
      timestamp: Date.now(),
      jobs,
      providerResults,
    });

    return res.status(200).json({
      success: true,
      fromCache: false,
      jobs,
      providerResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch external jobs.",
    });
  }
};
