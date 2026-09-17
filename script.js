/* =========================================================
   CONNECT — SOCIAL NETWORK
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pages = {
        home: document.getElementById("homePage"),
        explore: document.getElementById("explorePage"),
        notifications: document.getElementById("notificationsPage"),
        messages: document.getElementById("messagesPage"),
        friends: document.getElementById("friendsPage"),
        saved: document.getElementById("savedPage")
    };

    const navItems = document.querySelectorAll(".nav-item");
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

    const postModal = document.getElementById("postModal");
    const closePostModal = document.getElementById("closePostModal");

    const openCreatePost = document.getElementById("openCreatePost");
    const sideCreatePost = document.getElementById("sideCreatePost");
    const mobileCreatePost = document.getElementById("mobileCreatePost");
    const createStory = document.getElementById("createStory");

    const postText = document.getElementById("postText");
    const publishPost = document.getElementById("publishPost");

    const imageInput = document.getElementById("imageInput");
    const selectedImage = document.getElementById("selectedImage");

    const modalPhotoBtn = document.getElementById("modalPhotoBtn");
    const modalFeelingBtn = document.getElementById("modalFeelingBtn");
    const modalLocationBtn = document.getElementById("modalLocationBtn");

    const photoPostBtn = document.getElementById("photoPostBtn");
    const feelingBtn = document.getElementById("feelingBtn");
    const liveBtn = document.getElementById("liveBtn");

    const themeBtn = document.getElementById("themeBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const markNotifications =
        document.getElementById("markNotifications");

    const globalSearch =
        document.getElementById("globalSearch");

    const exploreSearch =
        document.getElementById("exploreSearch");

    const feed =
        document.getElementById("feed");

    const toast =
        document.getElementById("toast");

    const toastText =
        document.getElementById("toastText");

    const toastIcon =
        document.getElementById("toastIcon");


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function openPage(pageName) {

        Object.keys(pages).forEach(page => {

            if (pages[page]) {
                pages[page].classList.remove("active-page");
            }

        });

        if (pages[pageName]) {
            pages[pageName].classList.add("active-page");
        }


        navItems.forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === pageName
            );

        });


        mobileNavItems.forEach(item => {

            if (item.dataset.page) {

                item.classList.toggle(
                    "active",
                    item.dataset.page === pageName
                );

            }

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;

            if (page) {
                openPage(page);
            }

        });

    });


    mobileNavItems.forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;

            if (page) {
                openPage(page);
            }

        });

    });


    /* =====================================================
       CREATE POST MODAL
    ===================================================== */

    function openPostModal() {

        postModal.classList.add("show");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            postText.focus();
        }, 100);

    }


    function closeModal() {

        postModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (openCreatePost) {
        openCreatePost.addEventListener(
            "click",
            openPostModal
        );
    }


    if (sideCreatePost) {
        sideCreatePost.addEventListener(
            "click",
            openPostModal
        );
    }


    if (mobileCreatePost) {
        mobileCreatePost.addEventListener(
            "click",
            openPostModal
        );
    }


    if (createStory) {

        createStory.addEventListener("click", () => {

            showToast(
                "إضافة Story جديدة قريباً",
                "📸"
            );

        });

    }


    if (closePostModal) {

        closePostModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (postModal) {

        postModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === postModal
                ) {
                    closeModal();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal();

                notificationPanel?.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       IMAGE UPLOAD
    ===================================================== */

    if (modalPhotoBtn && imageInput) {

        modalPhotoBtn.addEventListener(
            "click",
            () => {

                imageInput.click();

            }
        );

    }


    if (photoPostBtn && imageInput) {

        photoPostBtn.addEventListener(
            "click",
            () => {

                openPostModal();

                setTimeout(() => {
                    imageInput.click();
                }, 150);

            }
        );

    }


    if (imageInput) {

        imageInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];

                if (!file) return;

                if (!file.type.startsWith("image/")) {

                    showToast(
                        "اختار صورة فقط",
                        "⚠️"
                    );

                    return;
                }


                const reader =
                    new FileReader();


                reader.onload = function(e) {

                    selectedImage.style.backgroundImage =
                        `url("${e.target.result}")`;

                    selectedImage.classList.add(
                        "show"
                    );

                    selectedImage.dataset.image =
                        e.target.result;

                };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================================
       FEELING BUTTON
    ===================================================== */

    if (feelingBtn) {

        feelingBtn.addEventListener(
            "click",
            () => {

                openPostModal();

                setTimeout(() => {

                    postText.value =
                        "أشعر اليوم بـ 😊";

                    postText.focus();

                }, 100);

            }
        );

    }


    if (modalFeelingBtn) {

        modalFeelingBtn.addEventListener(
            "click",
            () => {

                const feelings = [
                    "😊 سعيد",
                    "🔥 متحمس",
                    "💪 قوي",
                    "🚀 متفائل",
                    "❤️ ممتن",
                    "😎 رائع"
                ];

                const randomFeeling =
                    feelings[
                        Math.floor(
                            Math.random() *
                            feelings.length
                        )
                    ];

                postText.value =
                    `أشعر اليوم بـ ${randomFeeling}`;

                postText.focus();

            }
        );

    }


    /* =====================================================
       LOCATION
    ===================================================== */

    if (modalLocationBtn) {

        modalLocationBtn.addEventListener(
            "click",
            () => {

                postText.value +=
                    " 📍 تونس";

                postText.focus();

            }
        );

    }


    /* =====================================================
       PUBLISH POST
    ===================================================== */

    if (publishPost) {

        publishPost.addEventListener(
            "click",
            publishNewPost
        );

    }


    function publishNewPost() {

        const text =
            postText.value.trim();

        const image =
            selectedImage.dataset.image || "";


        if (!text && !image) {

            showToast(
                "اكتب حاجة قبل ما تنشر",
                "⚠️"
            );

            postText.focus();

            return;

        }


        const post =
            document.createElement("article");

        post.className = "post-card";

        post.dataset.postId =
            Date.now();


        let imageHTML = "";

        if (image) {

            imageHTML = `
                <div
                    class="user-uploaded-image"
                    style="
                        background-image:url('${image}');
                    "
                ></div>
            `;

        }


        post.innerHTML = `

            <div class="post-header">

                <div class="post-user">

                    <div class="avatar">
                        K
                    </div>

                    <div class="post-user-info">

                        <strong>
                            Khalil Shili
                        </strong>

                        <span>
                            الآن · 🌎
                        </span>

                    </div>

                </div>

                <button class="post-menu">
                    •••
                </button>

            </div>


            ${
                text
                ?
                `
                <div class="post-content">
                    <p>${escapeHTML(text)}</p>
                </div>
                `
                :
                ""
            }


            ${imageHTML}


            <div class="post-stats">

                <span class="likes-number">
                    ❤️ 0 إعجاب
                </span>

                <span>
                    0 تعليق · 0 مشاركة
                </span>

            </div>


            <div class="post-buttons">

                <button
                    class="post-btn like-btn"
                >
                    ♡
                    <span>إعجاب</span>
                </button>

                <button
                    class="post-btn comment-btn"
                >
                    💬
                    <span>تعليق</span>
                </button>

                <button
                    class="post-btn share-btn"
                >
                    ↗
                    <span>مشاركة</span>
                </button>

            </div>


            <div class="comments-area">

                <div class="comment-input">

                    <div class="avatar avatar-tiny">
                        K
                    </div>

                    <input
                        type="text"
                        placeholder="اكتب تعليق..."
                    >

                    <button>
                        ➤
                    </button>

                </div>

            </div>

        `;


        feed.prepend(post);


        attachPostEvents(post);


        savePostLocally({
            id: post.dataset.postId,
            text,
            image,
            time: new Date().toISOString()
        });


        postText.value = "";

        selectedImage.style.backgroundImage =
            "";

        selectedImage.classList.remove(
            "show"
        );

        delete selectedImage.dataset.image;

        imageInput.value = "";


        closeModal();


        showToast(
            "تم نشر المنشور بنجاح 🎉",
            "✓"
        );

    }


    /* =====================================================
       POST EVENTS
    ===================================================== */

    function attachPostEvents(post) {

        const likeBtn =
            post.querySelector(".like-btn");

        const commentBtn =
            post.querySelector(".comment-btn");

        const shareBtn =
            post.querySelector(".share-btn");

        const commentArea =
            post.querySelector(".comments-area");

        const commentInput =
            post.querySelector(
                ".comment-input input"
            );

        const commentSend =
            post.querySelector(
                ".comment-input button"
            );


        /* LIKE */

        if (likeBtn) {

            likeBtn.addEventListener(
                "click",
                () => {

                    const isLiked =
                        likeBtn.classList.toggle(
                            "liked"
                        );


                    const stats =
                        post.querySelector(
                            ".likes-number"
                        );


                    if (!stats) return;


                    const currentText =
                        stats.textContent;

                    const match =
                        currentText.match(
                            /\d+/
                        );

                    let count =
                        match
                        ?
                        Number(match[0])
                        :
                        0;


                    if (isLiked) {

                        count++;

                        likeBtn.innerHTML =
                            `
                            ❤️
                            <span>إعجاب</span>
                            `;

                    } else {

                        count =
                            Math.max(
                                0,
                                count - 1
                            );

                        likeBtn.innerHTML =
                            `
                            ♡
                            <span>إعجاب</span>
                            `;

                    }


                    stats.textContent =
                        `❤️ ${count} إعجاب`;

                }
            );

        }


        /* COMMENT */

        if (commentBtn && commentArea) {

            commentBtn.addEventListener(
                "click",
                () => {

                    commentArea.classList.toggle(
                        "show"
                    );


                    if (
                        commentArea.classList.contains(
                            "show"
                        )
                    ) {

                        commentInput?.focus();

                    }

                }
            );

        }


        /* SEND COMMENT */

        if (
            commentSend &&
            commentInput
        ) {

            commentSend.addEventListener(
                "click",
                () => {

                    addComment(
                        post,
                        commentInput
                    );

                }
            );


            commentInput.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        addComment(
                            post,
                            commentInput
                        );

                    }

                }
            );

        }


        /* SHARE */

        if (shareBtn) {

            shareBtn.addEventListener(
                "click",
                () => {

                    const shareData = {
                        title: "Connect",
                        text:
                            "شوف المنشور هذا على Connect"
                    };


                    if (
                        navigator.share
                    ) {

                        navigator.share(
                            shareData
                        ).catch(() => {});

                    } else {

                        showToast(
                            "تم نسخ رابط المنشور",
                            "🔗"
                        );

                    }

                }
            );

        }


        /* POST MENU */

        const menu =
            post.querySelector(".post-menu");

        if (menu) {

            menu.addEventListener(
                "click",
                () => {

                    showToast(
                        "خيارات المنشور",
                        "•••"
                    );

                }
            );

        }

    }


    function addComment(
        post,
        input
    ) {

        const text =
            input.value.trim();

        if (!text) return;


        const commentsArea =
            post.querySelector(
                ".comments-area"
            );


        const comment =
            document.createElement("div");

        comment.className = "comment";


        comment.innerHTML = `

            <div class="avatar avatar-tiny">
                K
            </div>

            <div class="comment-bubble">

                <strong>
                    Khalil
                </strong>

                <p>
                    ${escapeHTML(text)}
                </p>

            </div>

        `;


        const inputBox =
            commentsArea.querySelector(
                ".comment-input"
            );


        commentsArea.insertBefore(
            comment,
            inputBox
        );


        input.value = "";


        showToast(
            "تم إضافة التعليق 💬",
            "✓"
        );

    }


    document
        .querySelectorAll(".post-card")
        .forEach(attachPostEvents);


    /* =====================================================
       SAVE POSTS
    ===================================================== */

    function savePostLocally(post) {

        let posts = [];

        try {

            posts =
                JSON.parse(
                    localStorage.getItem(
                        "connect_posts"
                    )
                ) || [];

        } catch {

            posts = [];

        }


        posts.unshift(post);


        localStorage.setItem(
            "connect_posts",
            JSON.stringify(posts.slice(0, 30))
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            () => {

                const query =
                    globalSearch.value
                        .trim()
            
