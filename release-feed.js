window.Lab3776ReleaseFeed = (function () {
  function pickAsset(assets, preferredName) {
    if (!Array.isArray(assets) || assets.length === 0) {
      return null;
    }

    if (preferredName) {
      for (var index = 0; index < assets.length; index++) {
        if (assets[index] && assets[index].name === preferredName) {
          return assets[index];
        }
      }
    }

    return assets[0];
  }

  function summarizeBody(body, maxItems) {
    if (!body) {
      return [];
    }

    var lines = body.split(/\r?\n/);
    var items = [];
    for (var index = 0; index < lines.length; index++) {
      var line = lines[index].trim();
      if (!line) {
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        items.push(line.replace(/^[-*]\s+/, ""));
      }
      else if (items.length === 0 && !/^#+\s*/.test(line)) {
        items.push(line);
      }

      if (items.length >= maxItems) {
        break;
      }
    }

    return items;
  }

  function formatPublishedDate(isoString, lang) {
    if (!isoString) {
      return lang === "ja" ? "取得できません" : "Unavailable";
    }

    var locale = lang === "ja" ? "ja-JP" : "en-US";
    return new Date(isoString).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  async function fetchLatestRelease(options) {
    var apiUrl = "https://api.github.com/repos/" + options.owner + "/" + options.repo + "/releases/latest";
    var response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      throw new Error("GitHub release fetch failed: " + response.status);
    }

    var release = await response.json();
    return {
      tagName: release.tag_name || "",
      title: release.name || release.tag_name || "",
      htmlUrl: release.html_url,
      publishedAt: release.published_at,
      body: release.body || "",
      summaryItems: summarizeBody(release.body || "", options.summaryCount || 3),
      asset: pickAsset(release.assets || [], options.assetName || "")
    };
  }

  return {
    fetchLatestRelease: fetchLatestRelease,
    formatPublishedDate: formatPublishedDate
  };
})();
