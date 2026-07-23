document.addEventListener("DOMContentLoaded", () => {
  const config = window.PORTAL_CONFIG || {
    defaultOciIp: "129.225.197.60",
    useSubpathRouting: true,
    services: []
  };

  const cardsGrid = document.getElementById("cards-grid");
  let currentHost = window.location.hostname;
  const isFileProtocol = window.location.protocol === "file:";
  
  if (!currentHost || currentHost === "" || currentHost === "null" || isFileProtocol) {
    currentHost = "localhost";
  }

  const currentHostDisplay = document.getElementById("current-host-display");
  if (currentHostDisplay) {
    currentHostDisplay.innerText = currentHost;
  }

  // 카드 렌더링 함수
  function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = "";

    config.services.forEach((service) => {
      let fullUrl = "#";
      let displayUrl = "";

      // 로컬 파일이나 localhost 일 경우 포트 기준, 도메인/서버 호스트일 경우 서브패스 기준 라우팅
      if (config.useSubpathRouting && service.path && !isFileProtocol && currentHost !== "localhost") {
        fullUrl = `${window.location.protocol}//${currentHost}${service.path}`;
        displayUrl = `${currentHost}${service.path}`;
      } else {
        fullUrl = service.port
          ? `${service.protocol}://${currentHost}:${service.port}`
          : `${service.protocol}://${currentHost}`;
        displayUrl = service.port ? `${currentHost}:${service.port}` : `${currentHost}`;
      }

      const card = document.createElement("a");
      card.className = `service-card ${service.disabled ? "disabled" : ""}`;
      if (!service.disabled) {
        card.href = fullUrl;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }

      card.innerHTML = `
        <div>
          <div class="card-header">
            <div class="card-icon">${service.icon || "💻"}</div>
            <span class="card-badge badge-${service.badgeColor || "cyan"}">${service.badge || "Service"}</span>
          </div>
          <h2 class="card-title">${service.title}</h2>
          <p class="card-desc">${service.description}</p>
          <div class="card-tags">
            ${(service.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>
        </div>
        <div class="card-footer">
          <span class="service-url">${service.disabled ? 'Coming soon...' : displayUrl}</span>
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      `;

      cardsGrid.appendChild(card);
    });
  }

  // Initial Render
  renderCards();
});
