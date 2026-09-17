/* =========================================================
   CONNECT — SOCIAL NETWORK
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".nav-item");
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

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
    const darkModeSwitch = document.getElementById("darkModeSwitch");

    const notificationBtn = document.getElementById("notificationBtn");
    const notificationPanel = document.getElementById("notificationPanel");
    const closeNotificationPanel = document.getElementById("closeNotificationPanel");
    const markNotifications = document.getElementById("markNotifications");

    const globalSearch = document.getElementById("globalSearch");
    const exploreSearch = document.getElementById("exploreSearch");

    const feed = document.getElementById("feed");

    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
    const toastIcon = document.getElementById("toastIcon");

    const viewAllStories = document.getElementById("viewAllStories");


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer = null;

    function showToast(message, icon = "✓") {

        if (!toast) return;

        if (toastText) {
            toastText.textContent = message;
        }

        if (toastIcon) {
            toastIcon.textContent = icon;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function openPage(pageId) {

        if (!pageId) return;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const targetPage = document.getElementById(pageId);

        if (targetPage) {
            targetPage.classList.add("active");
        }

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );
        });

        mobileNavItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId = item.dataset.page;

            if (pageId) {
                openPage(pageId);
            }

        });

    });


    mobileNavItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId = item.dataset.page;

            if (pageId) {
                openPage(pageId);
            }

        });

    });


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener("click", event => {

            event.stopPropagation();

            sidebar.classList.toggle("open");

        });

    }


    document.addEventListener("click", event => {

        if (!sidebar || !mobileMenuBtn) return;

        if (
            window.innerWidth <= 800 &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)
        ) {

            sidebar.classList.remove("open");

        }

    });


    /* =====================================================
       POST MODAL
    ===================================================== */

    function openPostModal() {

        if (!postModal) return;

        postModal.classList.add("show");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            if (postText) {
                postText.focus();
            }

        }, 100);

    }


    function closeModal() {

        if (!postModal) return;

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
                "ميزة القصص ستتوفر قريباً",
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


    const modalOverlay = document.querySelector(".modal-overlay");

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            event => {

                if (event.target === modalOverlay) {
                    closeModal();
                }

            }
        );

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (
                postModal &&
                postModal.classList.contains("show")
            ) {
                closeModal();
            }

            if (
                notificationPanel &&
                notificationPanel.classList.contains("show")
            ) {
                notificationPanel.classList.remove("show");
            }

        }

    });


    /* =====================================================
       IMAGE UPLOAD
    ===================================================== */

    if (modalPhotoBtn && imageInput) {

        modalPhotoBtn.addEventListener("click", () => {

            imageInput.click();

        });

    }


    if (photoPostBtn && imageInput) {

        photoPostBtn.addEventListener("click", () => {

            openPostModal();

            setTimeout(() => {
                imageInput.click();
            }, 150);

        });

    }


    if (imageInput) {

        imageInput.addEventListener("change", event => {

            const file = event.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {

                showToast(
                    "الملف المختار ليس صورة",
                    "⚠️"
                );

                imageInput.value = "";

                return;
            }

            const reader = new FileReader();

            reader.onload = e => {

                if (!selectedImage) return;

                selectedImage.innerHTML = `
                    <img
                        src="${e.target.result}"
                        alt="الصورة المختارة"
                    >
                `;

                selectedImage.style.display = "block";

            };

            reader.readAsDataURL(file);

        });

    }


    /* =====================================================
       FEELING
    ===================================================== */

    if (modalFeelingBtn) {

        modalFeelingBtn.addEventListener("click", () => {

            if (!postText) return;

            const feelings = [
                "😊 سعيد",
                "❤️ أحب",
                "🔥 متحمس",
                "😎 رائع",
                "🤔 أفكر",
                "🎉 أحتفل"
            ];

            const feeling =
                feelings[
                    Math.floor(
                        Math.random() * feelings.length
                    )
                ];

            postText.value +=
                postText.value
                    ? ` ${feeling}`
                    : feeling;

            postText.focus();

        });

    }


    if (feelingBtn) {

        feelingBtn.addEventListener("click", () => {

            openPostModal();

            setTimeout(() => {

                if (modalFeelingBtn) {
                    modalFeelingBtn.click();
                }

            }, 100);

        });

    }


    /* =====================================================
       LOCATION
    ===================================================== */

    if (modalLocationBtn) {

        modalLocationBtn.addEventListener("click", () => {

            if (!postText) return;

            const locationText = "📍 تونس";

            postText.value +=
                postText.value
                    ? `\n${locationText}`
                    : locationText;

            postText.focus();

        });

    }


    /* =====================================================
       LIVE
    ===================================================== */

    if (liveBtn) {

        liveBtn.addEventListener("click", () => {

            showToast(
                "البث المباشر سيكون متاحاً قريباً 🔴",
                "🔴"
            );

        });

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

        if (!feed || !postText) return;

        const text = postText.value.trim();

        const imageHTML =
            selectedImage
                ? selectedImage.innerHTML.trim()
                : "";


        if (!text && !imageHTML) {

            showToast(
                "اكتب شيئاً قبل النشر",
                "⚠️"
            );

            return;
        }


        const post = document.createElement("article");

        post.className = "post-card";


        post.innerHTML = `

            <div class="post-header">

                <div class="post-author">

                    <div class="post-avatar">
                        K
                    </div>

                    <div>
                        <h3>كـ Khalil</h3>
                        <span>الآن · 🌍</span>
                    </div>

                </div>

                <button
                    class="post-more"
                    type="button"
                    aria-label="المزيد"
                >
                    ⋮
                </button>

            </div>


            <div class="post-content">

                ${
                    text
                        ? `<p>${escapeHTML(text).replace(/\n/g, "<br>")}</p>`
                        : ""
                }

                ${
                    imageHTML
                        ? `
                            <div class="new-post-image">
                                ${imageHTML}
                            </div>
                        `
                        : ""
                }

            </div>


            <div class="post-stats">

                <span class="like-count">
                    ❤️ 0 إعجاب
                </span>

                <span class="comment-count">
                    0 تعليق
                </span>

            </div>


            <div class="post-actions">

                <button
                    class="post-action like-btn"
                    type="button"
                >
                    ♡
                    <span>إعجاب</span>
                </button>

                <button
                    class="post-action comment-btn"
                    type="button"
                >
                    💬
                    <span>تعليق</span>
                </button>

                <button
                    class="post-action share-btn"
                    type="button"
                >
                    ↗️
                    <span>مشاركة</span>
                </button>

                <button
                    class="post-action save-btn"
                    type="button"
                >
                    🔖
                    <span>حفظ</span>
                </button>

            </div>


            <div class="comment-box">

                <div class="comment-avatar">
                    K
                </div>

                <input
                    type="text"
                    placeholder="اكتب تعليقاً..."
                >

            </div>

        `;


        feed.prepend(post);


        closeModal();


        postText.value = "";

        if (selectedImage) {
            selectedImage.innerHTML = "";
            selectedImage.style.display = "none";
        }

        if (imageInput) {
            imageInput.value = "";
        }


        showToast(
            "تم نشر المنشور بنجاح 🎉",
            "✓"
        );


        attachPostEvents(post);

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    /* =====================================================
       POST EVENTS
    ===================================================== */

    function attachPostEvents(post) {

        if (!post) return;


        const likeButton =
            post.querySelector(".like-btn");

        const saveButton =
            post.querySelector(".save-btn");

        const commentButton =
            post.querySelector(".comment-btn");

        const shareButton =
            post.querySelector(".share-btn");

        const commentInput =
            post.querySelector(".comment-box input");

        const likeCount =
            post.querySelector(".like-count");

        const commentCount =
            post.querySelector(".comment-count");


        /* LIKE */

        if (likeButton) {

            likeButton.addEventListener(
                "click",
                () => {

                    const liked =
                        likeButton.classList.toggle("liked");

                    likeButton.innerHTML =
                        liked
                            ? `♥ <span>إعجاب</span>`
                            : `♡ <span>إعجاب</span>`;


                    if (likeCount) {

                        likeCount.textContent =
                            liked
                                ? "❤️ 1 إعجاب"
                                : "❤️ 0 إعجاب";

                    }


                    showToast(
                        liked
                            ? "تم الإعجاب بالمنشور ❤️"
                            : "تم إلغاء الإعجاب",
                        liked ? "♥" : "♡"
                    );

                }
            );

        }


        /* SAVE */

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                () => {

                    const saved =
                        saveButton.classList.toggle("saved");


                    showToast(
                        saved
                            ? "تم حفظ المنشور 🔖"
                            : "تم إلغاء حفظ المنشور",
                        saved ? "🔖" : "✓"
                    );

                }
            );

        }


        /* COMMENT BUTTON */

        if (commentButton) {

            commentButton.addEventListener(
                "click",
                () => {

                    if (commentInput) {

                        commentInput.focus();

                        commentInput.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }
            );

        }


        /* SHARE */

        if (shareButton) {

            shareButton.addEventListener(
                "click",
                async () => {

                    const shareText =
                        "شاهد هذا المنشور على Connect";

                    if (
                        navigator.share
                    ) {

                        try {

                            await navigator.share({
                                title: "Connect",
                                text: shareText,
                                url: window.location.href
                            });

                        } catch (error) {

                            if (
                                error &&
                                error.name !== "AbortError"
                            ) {
                                showToast(
                                    "تعذر فتح المشاركة",
                                    "⚠️"
                                );
                            }

                        }

                    } else {

                        try {

                            await navigator.clipboard.writeText(
                                window.location.href
                            );

                            showToast(
                                "تم نسخ رابط المنشور 🔗",
                                "✓"
                            );

                        } catch (error) {

                            showToast(
                                "تم الضغط على المشاركة",
                                "↗️"
                            );

                        }

                    }

                }
            );

        }


        /* COMMENT */

        if (commentInput) {

            commentInput.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" &&
                        commentInput.value.trim()
                    ) {

                        event.preventDefault();

                        const comment =
                            commentInput.value.trim();

                        commentInput.value = "";


                        if (commentCount) {

                            const current =
                                parseInt(
                                    commentCount.
