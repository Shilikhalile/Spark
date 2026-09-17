/* =========================================================
   CONNECT — SOCIAL NETWORK
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const pages = {
    home: document.getElementById("homePage"),
    explore: document.getElementById("explorePage"),
    notifications: document.getElementById("notificationsPage"),
    messages: document.getElementById("messagesPage"),
    profile: document.getElementById("profilePage"),
    settings: document.getElementById("settingsPage")
  };

  const navItems = document.querySelectorAll(
    ".nav-item[data-page], .mobile-nav-item[data-page]"
  );

  const createModal = document.getElementById("createModal");
  const createPostBtn = document.getElementById("createPostBtn");
  const mobileCreateBtn = document.getElementById("mobileCreateBtn");
  const mobileCreateMain = document.getElementById("mobileCreateMain");
  const createInput = document.getElementById("createInput");
  const closeModal = document.getElementById("closeModal");
  const publishBtn = document.getElementById("publishBtn");
  const postText = document.getElementById("postText");

  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");

  const themeBtn = document.getElementById("themeBtn");
  const profileBtn = document.getElementById("profileBtn");
  const messageBtn = document.getElementById("messageBtn");
  const notificationBtn = document.getElementById("notificationBtn");

  let toastTimer = null;


  /* =======================================================
     NAVIGATION
  ======================================================= */

  function showPage(pageName) {

    if (!pages[pageName]) return;

    Object.values(pages).forEach(page => {
      page.classList.remove("active");
    });

    pages[pageName].classList.add("active");

    navItems.forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.page === pageName
      );

    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  navItems.forEach(item => {

    item.addEventListener("click", () => {

      const pageName = item.dataset.page;

      showPage(pageName);

    });

  });


  /* =======================================================
     TOP BUTTONS
  ======================================================= */

  if (profileBtn) {

    profileBtn.addEventListener("click", () => {

      showPage("profile");

    });

  }


  if (messageBtn) {

    messageBtn.addEventListener("click", () => {

      showPage("messages");

    });

  }


  if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

      showPage("notifications");

    });

  }


  /* =======================================================
     CREATE POST MODAL
  ======================================================= */

  function openCreateModal() {

    if (!createModal) return;

    createModal.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

      if (postText) {
        postText.focus();
      }

    }, 150);

  }


  function closeCreateModal() {

    if (!createModal) return;

    createModal.classList.remove("show");

    document.body.style.overflow = "";

  }


  if (createPostBtn) {
    createPostBtn.addEventListener(
      "click",
      openCreateModal
    );
  }


  if (mobileCreateBtn) {
    mobileCreateBtn.addEventListener(
      "click",
      openCreateModal
    );
  }


  if (mobileCreateMain) {
    mobileCreateMain.addEventListener(
      "click",
      openCreateModal
    );
  }


  if (createInput) {
    createInput.addEventListener(
      "click",
      openCreateModal
    );
  }


  if (closeModal) {

    closeModal.addEventListener(
      "click",
      closeCreateModal
    );

  }


  if (createModal) {

    createModal.addEventListener("click", event => {

      if (event.target === createModal) {

        closeCreateModal();

      }

    });

  }


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeCreateModal();

    }

  });


  /* =======================================================
     CREATE POST
  ======================================================= */

  if (publishBtn) {

    publishBtn.addEventListener(
      "click",
      createPost
    );

  }


  function createPost() {

    const text = postText.value.trim();

    if (!text) {

      showToast(
        "Écrivez quelque chose avant de publier."
      );

      postText.focus();

      return;

    }


    const feed = document.getElementById("feed");

    if (!feed) return;


    const article = document.createElement("article");

    article.className = "post";


    article.innerHTML = `

      <div class="post-header">

        <div class="post-user-avatar">
          K
        </div>

        <div class="post-user-info">

          <strong>Khalil</strong>

          <span>
            @khalil · À l'instant
          </span>

        </div>

        <button class="post-more">
          ⋯
        </button>

      </div>


      <div class="post-content">

        <p></p>

      </div>


      <div class="post-stats">

        <span>
          ❤️ 0 réactions
        </span>

        <span>
          0 commentaires
        </span>

      </div>


      <div class="post-actions">

        <button class="like-btn">

          ♡

          <span>
            J'aime
          </span>

        </button>


        <button class="comment-btn">

          ◌

          <span>
            Commenter
          </span>

        </button>


        <button class="share-btn">

          ↗

          <span>
            Partager
          </span>

        </button>

      </div>


      <div class="comment-area">

        <div class="comment-avatar">
          K
        </div>

        <input
          type="text"
          placeholder="Écrire un commentaire..."
        >

      </div>

    `;


    const paragraph =
      article.querySelector(".post-content p");

    paragraph.textContent = text;


    feed.prepend(article);


    postText.value = "";

    closeCreateModal();

    setupPost(article);

    showToast(
      "Votre publication a été publiée."
    );

  }


  /* =======================================================
     LIKE SYSTEM
  ======================================================= */

  function setupPost(post) {

    const likeBtn =
      post.querySelector(".like-btn");

    const stats =
      post.querySelector(".post-stats span");

    if (likeBtn) {

      likeBtn.addEventListener(
        "click",
        () => {

          const liked =
            likeBtn.classList.toggle("liked");

          const icon =
            likeBtn.firstChild;

          if (liked) {

            likeBtn.innerHTML =
              `♥ <span>J'aime</span>`;

            updateReactionCount(
              stats,
              1
            );

          } else {

            likeBtn.innerHTML =
              `♡ <span>J'aime</span>`;

            updateReactionCount(
              stats,
              -1
            );

          }

        }
      );

    }


    const commentBtn =
      post.querySelector(".comment-btn");

    const commentInput =
      post.querySelector(".comment-area input");


    if (commentBtn && commentInput) {

      commentBtn.addEventListener(
        "click",
        () => {

          commentInput.focus();

        }
      );


      commentInput.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" &&
            commentInput.value.trim()
          ) {

            addComment(
              post,
              commentInput.value.trim()
            );

            commentInput.value = "";

          }

        }
      );

    }


    const shareBtn =
      post.querySelector(".share-btn");


    if (shareBtn) {

      shareBtn.addEventListener(
        "click",
        () => {

          sharePost(post);

        }
      );

    }

  }


  function updateReactionCount(
    statsElement,
    amount
  ) {

    if (!statsElement) return;


    const currentText =
      statsElement.textContent;


    const match =
      currentText.match(/\d+/);


    let count =
      match
        ? parseInt(match[0])
        : 0;


    count += amount;


    if (count < 0) {
      count = 0;
    }


    statsElement.textContent =
      `❤️ ${count} réactions`;

  }


  /* =======================================================
     COMMENTS
  ======================================================= */

  function addComment(post, text) {

    const commentArea =
      post.querySelector(".comment-area");


    const comment =
      document.createElement("div");


    comment.style.display = "flex";
    comment.style.gap = "8px";
    comment.style.marginTop = "9px";
    comment.style.padding = "8px 10px";
    comment.style.borderRadius = "10px";
    comment.style.background =
      "var(--surface-2)";


    comment.innerHTML = `

      <div class="comment-avatar">
        K
      </div>

      <div>

        <strong
          style="
            display:block;
            font-size:11px;
          "
        >
          Khalil
        </strong>

        <span
          style="
            color:var(--muted);
            font-size:11px;
          "
        ></span>

      </div>

    `;


    comment.querySelector(
      "span"
    ).textContent = text;


    commentArea.after(comment);


    showToast(
      "Commentaire ajouté."
    );

  }


  /* =======================================================
     SHARE
  ======================================================= */

  async function sharePost(post) {

    const text =
      post.querySelector(
        ".post-content p"
      )?.textContent ||
      "Publication Connect";


    if (
      navigator.share
    ) {

      try {

        await navigator.share({
          title: "Connect",
          text: text
        });

        showToast(
          "Publication partagée."
        );

      } catch (error) {

        // utilisateur a annulé

      }

      return;

    }


    try {

      await navigator.clipboard.writeText(
        text
      );

      showToast(
        "Texte copié dans le presse-papiers."
      );

    } catch (error) {

      showToast(
        "Impossible de partager cette publication."
      );

    }

  }


  /* =======================================================
     INITIALIZE EXISTING POSTS
  ======================================================= */

  document
    .querySelectorAll(".post")
    .forEach(post => {

      setupPost(post);

    });


  /* =======================================================
     FOLLOW BUTTONS
  ======================================================= */

  document
    .querySelectorAll(
      ".follow-btn, .follow-back"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const following =
            button.dataset.following === "true";


          if (following) {

            button.dataset.following =
              "false";

            button.textContent =
              "Suivre";

            showToast(
              "Vous ne suivez plus cette personne."
            );

          } else {

            button.dataset.following =
              "true";

            button.textContent =
              "Suivi ✓";

            showToast(
              "Vous suivez maintenant cette personne."
            );

          }

        }
      );

    });


  /* =======================================================
     SEARCH
  ======================================================= */

  const searchInput =
    document.getElementById(
      "searchInput"
    );


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {

        const query =
          searchInput.value
            .trim()
            .toLowerCase();


        if (!query) {

          showPage("home");

          return;

        }


        const posts =
          document.querySelectorAll(
            ".post"
          );


        let found = false;


        posts.forEach(post => {

          const text =
            post.textContent.toLowerCase();


          if (text.includes(query)) {

            post.style.display =
              "";

            found = true;

          } else {

            post.style.display =
              "none";

          }

        });


        showPage("home");


        if (found) {

          showToast(
            `Résultats pour « ${query} »`
          );

        } else {

          showToast(
            "Aucun résultat trouvé."
          );

        }

      }
    );

  }


  /* =======================================================
     DARK MODE / LIGHT MODE
  ======================================================= */

  let lightMode =
    localStorage.getItem(
      "connect_theme"
    ) === "light";


  function applyTheme() {

    if (lightMode) {

      document.body.classList.add(
        "light-mode"
      );

      themeBtn.textContent = "☀";

    } else {

      document.body.classList.remove(
        "light-mode"
      );

      themeBtn.textContent = "◐";

    }

  }


  if (themeBtn) {

    themeBtn.addEventListener(
      "click",
      () => {

        lightMode =
          !lightMode;


        localStorage.setItem(
          "connect_theme",
          lightMode
            ? "light"
            : "dark"
        );


        applyTheme();


        showToast(
          lightMode
            ? "Mode clair activé."
            : "Mode sombre activé."
        );

      }
    );

  }


  applyTheme();


  /* =======================================================
     NOTIFICATION BUTTON
  ======================================================= */

  const notificationDot =
    document.querySelector(
      ".notification-dot"
    );


  if (notificationBtn) {

    notificationBtn.addEventListener(
      "dblclick",
      () => {

        if (notificationDot) {

          notificationDot.style.display =
            "none";

        }

        showToast(
          "Notifications marquées comme lues."
        );

      }
    );

  }


  /* =======================================================
     MESSAGE CONVERSATIONS
  ======================================================= */

  document
    .querySelectorAll(".conversation")
    .forEach(conversation => {

      conversation.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".conversation"
            )
            .forEach(item => {

              item.classList.remove(
                "active"
              );

            });


          conversation.classList.add(
            "active"
          );


          const name =
            conversation.querySelector(
              "strong"
            )?.textContent ||
            "Conversation";


          showToast(
            `Conversation avec ${name}`
          );

        }
      );

    });


  /* =======================================================
     PROFILE TABS
  ======================================================= */

  document
    .querySelectorAll(
      ".profile-tabs button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".profile-tabs button"
            )
            .forEach(tab => {

              tab.classList.remove(
                "active"
              );

            });


          button.classList.add(
            "active"
          );


          showToast(
            button.textContent.trim()
          );

        }
      );

    });


  /* =======================================================
     SETTINGS
  ======================================================= */

  document
    .querySelectorAll(
      ".setting-item"
    )
    .forEach(item => {

      item.addEventListener(
        "click",
        () => {

          const title =
            item.querySelector(
              "strong"
            )?.textContent ||
            "Paramètres";


          showToast(
            `${title} — bientôt disponible.`
          );

        }
      );

    });


  /* =======================================================
     MODAL TOOLS
  ======================================================= */

  document
    .querySelectorAll(
      ".modal-tools button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const text =
            button.textContent.trim();


          showToast(
            `${text} — fonction bientôt disponible.`
          );

        }
      );

    });


  /* =======================================================
     POST MORE BUTTON
  ======================================================= */

  document
    .querySelectorAll(
      ".post-more"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          showToast(
            "Options de publication bientôt disponibles."
          );

        }
      );

    });


  /* =======================================================
     TOAST SYSTEM
  ======================================================= */

  function showToast(message) {

    if (!toast) return;


    if (toastTimer) {

      clearTimeout(
        toastTimer
      );

    }


    if (toastText) {

      toastText.textContent =
        message;

    }


    toast.classList.add(
      "show"
    );


    toastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2800);

  }


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeCreateModal();

      }

    }
  );


  /* =======================================================
     MOBILE CREATE BUTTON
  ======================================================= */

  if (mobileCreateMain) {

    mobileCreateMain.addEventListener(
      "click",
      () => {

        openCreateModal();

      }
    );

  }


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  showPage("home");


  console.log(
    "Connect Social Network initialized successfully."
  );

});
