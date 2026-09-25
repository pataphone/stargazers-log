const list = document.getElementById('starred-list');

async function loadStarredRepositories() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    console.error('Unable to load starred repositories:', error);
    list.innerHTML = '<li class="repo-item error">Unable to load starred repositories.</li>';
  }
}

function renderRepositories(repositories) {
  if (!Array.isArray(repositories) || repositories.length === 0) {
    list.innerHTML = '<li class="repo-item error">No starred repositories available.</li>';
    return;
  }

  list.innerHTML = repositories
    .map((repository) => {
      const formattedDate = new Date(repository.starred_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      return `
        <li class="repo-item">
          <div class="repo-header">
            <a href="${repository.html_url}" target="_blank" rel="noreferrer">
              ${repository.owner}/${repository.name}
            </a>
            <span class="star-pill">★ ${repository.stargazers_count}</span>
          </div>
          <p class="repo-description">${repository.description || 'No description provided.'}</p>
          <div class="repo-meta">
            <span>${repository.language || 'General'}</span>
            <span>Starred on ${formattedDate}</span>
          </div>
        </li>
      `;
    })
    .join('');
}

loadStarredRepositories();
