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
       PAGE NAVIGATION
    ===================================================== */

    function openPage(pageId) {

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

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    document.addEventListener("click", event => {

        if (!sidebar) return;

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


    const modalOverlay = document.querySelector(
        ".modal-overlay"
    );

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (postModal.classList.contains("show")) {
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

    if (modalPhotoBtn) {

        modalPhotoBtn.addEventListener("click", () => {

            imageInput.click();

        });

    }


    if (photoPostBtn) {

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

            const reader = new FileReader();

            reader.onload = e => {

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

                modalFeelingBtn.click();

            }, 100);

        });

    }


    /* =====================================================
       LOCATION
    ===================================================== */

    if (modalLocationBtn) {

        modalLocationBtn.addEventListener("click", () => {

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

        const text = postText.value.trim();

        const imageHTML =
            selectedImage.innerHTML.trim();

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

                <button class="post-more">
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

                <span>❤️ 0 إعجاب</span>

                <span>0 تعليق</span>

            </div>


            <div class="post-actions">

                <button class="post-action like-btn">
                    ♡
                    <span>إعجاب</span>
                </button>

                <button class="post-action">
                    💬
                    <span>تعليق</span>
                </button>

                <button class="post-action">
                    ↗️
                    <span>مشاركة</span>
                </button>

                <button class="post-action save-btn">
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

        selectedImage.innerHTML = "";

        selectedImage.style.display = "none";

        imageInput.value = "";


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

        const likeButton =
            post.querySelector(".like-btn");

        const saveButton =
            post.querySelector(".save-btn");

        const commentInput =
            post.querySelector(".comment-box input");


        if (likeButton) {

            likeButton.addEventListener(
                "click",
                () => {

                    likeButton.classList.toggle("liked");

                    const icon =
                        likeButton.firstChild;

                    if (
                        likeButton.classList.contains("liked")
                    ) {

                        likeButton.innerHTML =
                            `♥ <span>إعجاب</span>`;

                        showToast(
                            "تم الإعجاب بالمنشور ❤️",
                            "♥"
                        );

                    } else {

                        likeButton.innerHTML =
                            `♡ <span>إعجاب</span>`;

                    }

                }
            );

        }


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                () => {

                    saveButton.classList.toggle(
                        "saved"
                    );

                    if (
                        saveButton.classList.contains(
                            "saved"
                        )
                    ) {

                        showToast(
                            "تم حفظ المنشور 🔖",
                            "🔖"
                        );

                    } else {

                        showToast(
                            "تم إلغاء حفظ المنشور",
                            "✓"
                        );

                    }

                }
            );

        }


        if (commentInput) {

            commentInput.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" &&
                        commentInput.value.trim()
                    ) {

                        const comment =
                            commentInput.value.trim();

                        commentInput.value = "";

                        showToast(
                            "تم إضافة تعليق 💬",
                            "💬"
                        );

                    }

                }
            );

        }

    }


    document
        .querySelectorAll(".post-card")
        .forEach(post => {

            attachPostEvents(post);

        });


    /* =====================================================
       FOLLOW BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".follow-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const isFollowing =
                        button.dataset.following === "true";


                    if (isFollowing) {

                        button.textContent =
                            "متابعة";

                        button.dataset.following =
                            "false";

                    } else {

                        button.textContent =
                            "✓ متابع";

                        button.dataset.following =
                            "true";

                        showToast(
                            "تمت المتابعة بنجاح 👥",
                            "✓"
                        );

                    }

                }
            );

        });


    /* =====================================================
       DARK MODE
    ===================================================== */

    function setDarkMode(enabled) {

        document.body.classList.toggle(
            "dark",
            enabled
        );

        if (darkModeSwitch) {
            darkModeSwitch.checked = enabled;
        }

        if (themeBtn) {

            themeBtn.textContent =
                enabled ? "☀️" : "🌙";

        }

        localStorage.setItem(
            "connect_dark_mode",
            enabled ? "true" : "false"
        );

    }


    const savedTheme =
        localStorage.getItem(
            "connect_dark_mode"
        );

    if (savedTheme === "true") {

        setDarkMode(true);

    }


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                const enabled =
                    !document.body.classList.contains(
                        "dark"
                    );

                setDarkMode(enabled);

            }
        );

    }


    if (darkModeSwitch) {

        darkModeSwitch.addEventListener(
            "change",
            () => {

                setDarkMode(
                    darkModeSwitch.checked
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATION PANEL
    ===================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                notificationPanel.classList.toggle(
                    "show"
                );

            }
        );

    }


    if (closeNotificationPanel) {

        closeNotificationPanel.addEventListener(
            "click",
            () => {

                notificationPanel.classList.remove(
                    "show"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                notificationPanel &&
                notificationPanel.classList.contains("show") &&
                !notificationPanel.contains(event.target) &&
                !notificationBtn.contains(event.target)
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       MARK NOTIFICATIONS
    ===================================================== */

    if (markNotifications) {

        markNotifications.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".notification-item.unread"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "unread"
                        );

                    });


                const badges =
                    document.querySelectorAll(
                        ".notification-badge, .nav-count"
                    );


                badges.forEach(badge => {

                    badge.style.display = "none";

                });


                showToast(
                    "تم تحديد الإشعا    
