document.addEventListener("DOMContentLoaded", () => {
  const config = window.PORTAL_CONFIG || {
    defaultOciIp: "129.225.197.60",
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

      if (service.path && !isFileProtocol && currentHost !== "localhost") {
        // 방화벽 우회용 80번 서브패스 주소 (예: yeardayhour.duckdns.org/fastapi/)
        fullUrl = `${window.location.protocol}//${currentHost}${service.path}`;
        displayUrl = `${currentHost}${service.path}`;
      } else {
        // 기존 포트 직통 연결 (예: yeardayhour.duckdns.org:3000)
        const targetPort = service.port || 80;
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
