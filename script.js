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
    const modalOverlay = document.getElementById("modalOverlay");
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

    const darkModeToggle =
        document.getElementById("darkModeToggle");

    const darkModeSwitch =
        document.getElementById("darkModeSwitch");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotificationPanel =
        document.getElementById("closeNotificationPanel");

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

    const viewAllStories =
        document.getElementById("viewAllStories");


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

        const targetPage =
            document.getElementById(pageId);

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

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId =
                item.dataset.page;

            if (pageId) {
                openPage(pageId);
            }

        });

    });


    mobileNavItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId =
                item.dataset.page;

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

        if (!sidebar || !mobileMenuBtn) {
            return;
        }

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
       CREATE POST MODAL
    ===================================================== */

    function openPostModal() {

        if (!postModal) return;

        postModal.classList.add("show");

        if (modalOverlay) {
            modalOverlay.classList.add("show");
        }

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            if (postText) {
                postText.focus();
            }

        }, 100);
    }


    function closeModal() {

        if (postModal) {
            postModal.classList.remove("show");
        }

        if (modalOverlay) {
            modalOverlay.classList.remove("show");
        }

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


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

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
            }, 200);

        });

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
                        "الملف المختار ليس صورة",
                        "⚠️"
                    );

                    imageInput.value = "";

                    return;
                }

                const reader =
                    new FileReader();

                reader.onload = event => {

                    if (!selectedImage) return;

                    selectedImage.innerHTML = `
                        <img
                            src="${event.target.result}"
                            alt="الصورة المختارة"
                        >
                    `;

                    selectedImage.style.display =
                        "block";
                };

                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================================
       FEELING
    ===================================================== */

    if (modalFeelingBtn) {

        modalFeelingBtn.addEventListener(
            "click",
            () => {

                if (!postText) return;

                const feelings = [
                    "😊 سعيد",
                    "❤️ أحب",
                    "🔥 متحمس",
                    "😎 رائع",
                    "🤔 أفكر",
                    "🎉 أحتفل"
                ];

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        feelings.length
                    );

                const feeling =
                    feelings[randomIndex];

                postText.value +=
                    postText.value
                        ? ` ${feeling}`
                        : feeling;

                postText.focus();

            }
        );

    }


    if (feelingBtn) {

        feelingBtn.addEventListener(
            "click",
            () => {

                openPostModal();

                setTimeout(() => {

                    if (modalFeelingBtn) {
                        modalFeelingBtn.click();
                    }

                }, 100);

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

                if (!postText) return;

                const locationText =
                    "📍 تونس";

                postText.value +=
                    postText.value
                        ? `\n${locationText}`
                        : locationText;

                postText.focus();

            }
        );

    }


    /* =====================================================
       LIVE
    ===================================================== */

    if (liveBtn) {

        liveBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "البث المباشر سيكون متاحاً قريباً 🔴",
                    "🔴"
                );

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

        if (!feed || !postText) return;

        const text =
            postText.value.trim();

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


        const post =
            document.createElement("article");

        post.className =
            "post-card";


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
                >
                    ⋮
                </button>

            </div>


            <div class="post-content">

                ${
                    text
                        ? `
                            <p>
                                ${escapeHTML(text)
                                    .replace(/\n/g, "<br>")}
                            </p>
                        `
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

            selectedImage.style.display =
                "none";

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

        const div =
            document.createElement("div");

        div.textContent =
            text;

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

        const moreButton =
            post.querySelector(".post-more");

        const commentInput =
            post.querySelector(
                ".comment-box input"
            );

        const likeCount =
            post.querySelector(
                ".like-count"
            );

        const commentCount =
            post.querySelector(
                ".comment-count"
            );


        /* =================================================
           LIKE
        ================================================= */

        if (likeButton) {

            likeButton.addEventListener(
                "click",
                () => {

                    const liked =
                        likeButton.classList.toggle(
                            "liked"
                        );

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


        /* =================================================
           SAVE
        ================================================= */

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                () => {

                    const saved =
                        saveButton.classList.toggle(
                            "saved"
                        );

                    showToast(
                        saved
                            ? "تم حفظ المنشور 🔖"
                            : "تم إلغاء حفظ المنشور",
                        saved ? "🔖" : "✓"
                    );

                }
            );

        }


        /* =================================================
           COMMENT BUTTON
        ================================================= */

        if (commentButton) {

            commentButton.addEventListener(
                "click",
                () => {

                    if (!commentInput) return;

                    commentInput.focus();

                    commentInput.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }
            );

        }


        /* =================================================
           SHARE
        ================================================= */

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
                        or.share({
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

        if (navigator.clipboard) {

            await navigator.clipboard.writeText(
                window.location.href
            );

            showToast(
                "تم نسخ رابط المنشور 🔗",
                "✓"
            );

        } else {

            showToast(
                "تم الضغط على المشاركة",
                "↗️"
            );

        }

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


/* =================================================
   MORE
================================================= */

if (moreButton) {

    moreButton.addEventListener(
        "click",
        () => {

            showToast(
                "المزيد من الخيارات ستتوفر قريباً",
                "⋮"
            );

        }
    );

}


/* =================================================
   COMMENT SUBMIT
================================================= */

if (commentInput) {

    commentInput.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }

            const comment =
                commentInput.value.trim();

            if (!comment) {
                return;
            }

            event.preventDefault();

            commentInput.value = "";

            if (commentCount) {

                const current =
                    parseInt(
                        commentCount.textContent
                            .replace(/\D/g, ""),
                        10
                    ) || 0;

                const newCount =
                    current + 1;

                commentCount.textContent =
                    `${newCount} تعليق`;

            }

            showToast(
                "تم إضافة تعليقك 💬",
                "✓"
            );

        }
    );

}

}


/* =========================================================
   EXISTING POSTS
========================================================= */

if (feed) {

    const existingPosts =
        feed.querySelectorAll(".post-card");

    existingPosts.forEach(post => {
        attachPostEvents(post);
    });

}


/* =========================================================
   THEME
========================================================= */

function setDarkMode(enabled) {

    document.body.classList.toggle(
        "dark-mode",
        enabled
    );

    document.documentElement.classList.toggle(
        "dark-mode",
        enabled
    );

    if (darkModeToggle) {
        darkModeToggle.checked = enabled;
    }

    if (darkModeSwitch) {
        darkModeSwitch.checked = enabled;
    }

    localStorage.setItem(
        "connect-dark-mode",
        enabled ? "true" : "false"
    );

    showToast(
        enabled
            ? "تم تفعيل الوضع الليلي 🌙"
            : "تم إيقاف الوضع الليلي ☀️",
        enabled ? "🌙" : "☀️"
    );

}


const savedDarkMode =
    localStorage.getItem(
        "connect-dark-mode"
    ) === "true";


document.body.classList.toggle(
    "dark-mode",
    savedDarkMode
);

document.documentElement.classList.toggle(
    "dark-mode",
    savedDarkMode
);


if (darkModeToggle) {

    darkModeToggle.checked =
        savedDarkMode;

    darkModeToggle.addEventListener(
        "change",
        () => {

            setDarkMode(
                darkModeToggle.checked
            );

        }
    );

}


if (darkModeSwitch) {

    darkModeSwitch.checked =
        savedDarkMode;

    darkModeSwitch.addEventListener(
        "change",
        () => {

            setDarkMode(
                darkModeSwitch.checked
            );

        }
    );

}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            const enabled =
                !document.body.classList.contains(
                    "dark-mode"
                );

            setDarkMode(enabled);

        }
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            if (!notificationPanel) {
                return;
            }

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

            if (notificationPanel) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );

}


if (markNotifications) {

    markNotifications.addEventListener(
        "click",
        () => {

            const unread =
                document.querySelectorAll(
                    ".notification-item.unread"
                );

            unread.forEach(item => {
                item.classList.remove("unread");
            });

            showToast(
                "تم تحديد جميع الإشعارات كمقروءة",
                "✓"
            );

        }
    );

}


document.addEventListener(
    "click",
    event => {

        if (!notificationPanel) {
            return;
        }

        if (
            notificationPanel.classList.contains("show") &&
            !notificationPanel.contains(event.target) &&
            !(
                notificationBtn &&
                notificationBtn.contains(event.target)
            )
        ) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   SEARCH
========================================================= */

function searchPosts(input) {

    if (!input || !feed) return;

    const query =
        input.value
            .trim()
            .toLowerCase();

    const posts =
        feed.querySelectorAll(".post-card");

    posts.forEach(post => {

        if (!query) {

            post.style.display = "";

            return;
        }

        const text =
            post.textContent.toLowerCase();

        post.style.display =
            text.includes(query)
                ? ""
                : "none";

    });

}


if (globalSearch) {

    globalSearch.addEventListener(
        "input",
        () => {
            searchPosts(globalSearch);
        }
    );

}


if (exploreSearch) {

    exploreSearch.addEventListener(
        "input",
        () => {
            searchPosts(exploreSearch);
        }
    );

}


/* =========================================================
   STORIES
========================================================= */

if (viewAllStories) {

    viewAllStories.addEventListener(
        "click",
        () => {

            showToast(
                "سيتم عرض جميع القصص قريباً",
                "⭕"
            );

        }
    );

}


/* =========================================================
   FOLLOW BUTTONS
========================================================= */

function attachFollowEvents() {

    const followButtons =
        document.querySelectorAll(
            ".follow-btn"
        );

    followButtons.forEach(button => {

        if (
            button.dataset.connected === "true"
        ) {
            return;
        }

        button.dataset.connected = "true";

        button.addEventListener(
            "click",
            () => {

                const following =
                    button.classList.toggle(
                        "following"
                    );

                button.textContent =
                    following
                        ? "متابَع ✓"
                        : "متابعة";

                showToast(
                    following
                        ? "تمت المتابعة بنجاح ✓"
                        : "تم إلغاء المتابعة",
                    following ? "✓" : "−"
                );

            }
        );

    });

}


attachFollowEvents();


/* =========================================================
   PROFILE BUTTON
========================================================= */

const profileMiniBtn =
    document.getElementById(
        "profileMiniBtn"
    );

if (profileMiniBtn) {

    profileMiniBtn.addEventListener(
        "click",
        () => {

            openPage("profilePage");

        }
    );

}


/* =========================================================
   EDIT PROFILE
========================================================= */

const editProfileBtn =
    document.getElementById(
        "editProfileBtn"
    );

if (editProfileBtn) {

    editProfileBtn.addEventListener(
        "click",
        () => {

            showToast(
                "تعديل الملف الشخصي سيتوفر قريباً",
                "✏️"
            );

        }
    );

}


/* =========================================================
   SETTINGS
========================================================= */

const secondaryButtons =
    document.querySelectorAll(
        ".settings-list .secondary-btn"
    );

secondaryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showToast(
                "هذا الخيار سيتوفر قريباً",
                "⚙️"
            );

        }
    );

});


/* =========================================================
   INITIAL PAGE
========================================================= */

let initialPage =
    document.querySelector(
        ".page.active"
    );

if (!initialPage) {

    const homePage =
        document.getElementById(
            "homePage"
        );

    if (homePage) {

        homePage.classList.add(
            "active"
        );

        initialPage = homePage;

    }

}


if (initialPage) {

    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page ===
            initialPage.id
        );

    });

}


/* =========================================================
   CONNECT READY
========================================================= */

console.log(
    "CONNECT loaded successfully ✓"
);

});   
