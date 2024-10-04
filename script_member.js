import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRocKqlQ9x4VfWnm2DRcE9gmXkcGkAUU4",
    authDomain: "sparta-6baf7.firebaseapp.com",
    projectId: "sparta-6baf7",
    storageBucket: "sparta-6baf7.appspot.com",
    messagingSenderId: "743353220986",
    appId: "1:743353220986:web:e8cb40ab113de8f95de0c3",
    measurementId: "G-2B1DFF1EYN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$("#sign_up_btn").click(async function () {
    window.location.href = "register_page.html";
})

$("#register_button").click(async function () {
    let name_input = $('#name_input').val();
    let language_input = $('#language_input').val();
    let mbti_input = $('#mbti_input').val();
    let strength_input = $('#strength_input').val();
    let style_input = $('#style_input').val();
    let free_input = $('#free_input').val();
    let blog_input = $('#blog_input').val();
    let main_image = $('#main_image').val();
    let profile_image = $('#profile_image').val();


    let doc = {
        'name_input': name_input,
        'language_input': language_input,
        'mbti_input': mbti_input,
        'strength_input': strength_input,
        'style_input': style_input,
        'free_input': free_input,
        'blog_input': blog_input,
        'main_image': main_image,
        'profile_image': profile_image
    };

    await addDoc(collection(db, "TEAMIF_INFO"), doc);
    alert('저장 완료!');
    window.location.href = "index_member.html";
})

$(document).on('click', '.delete_button', async function () {
    let docId = $(this).data('doc');
    console.log("Deleting document with ID: ", docId); // 확인용 로그

    if (!docId) {
        alert('삭제할 문서 ID를 찾을 수 없습니다.');
        return;
    }

    try {
        await deleteDoc(doc(db, "TEAMIF_INFO", docId));
        alert('삭제 완료!');
        $(`#card-${docId}`).remove(); // 삭제된 카드도 화면에서 제거
        window.location.reload();
    } catch (error) {
        console.error("Error deleting document: ", error);
        alert('문서 삭제 중 오류가 발생했습니다.');
    }
});

async function loadTeamMembers() {
    const querySnapshot = await getDocs(collection(db, "TEAMIF_INFO"));
    querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const docId = docSnapshot.id;

        let cardHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${data.profile_image}" class="card-img-top" alt="${data.name_input}" style="object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title" style="font-weight: bold;">${data.name_input}</h5>
                        <div class="card_down">
                            <div class="profile_img">
                                <img src="${data.profile_image}" alt="${data.name_input}" />
                            </div>
                            <div class="profile_txt">
                                <span id="profile_name">${data.name_input}</span>
                                <span id="profile_mbti">${data.mbti_input}</span>
                            </div>
                        </div>
                    </div>
                    <ol class="breadcrumb" style="justify-content: flex-end;">
                        <li class="breadcrumb-item active detail_view" type="button" onclick="openclose(); loadDetail('${docId}');">상세 보기</li>
                        <li class="breadcrumb-item active" type="button" data-doc="${docId}">수정</li>
                        <li class="breadcrumb-item active delete_button" type="button" data-doc="${docId}">삭제</li>
                    </ol>
                </div>
            </div>`;

        $('#cards_member .row').append(cardHTML);
    });
}

async function loadDetail(docId) {
    const docRef = doc(db, "TEAMIF_INFO", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        $('#profile_image').attr('src', data.profile_image);
        $('#detail_name').text(data.name_input);
        $('#detail_mbti').text(data.mbti_input);
        $('#detail_blog').attr('href', data.blog_input);
        $('#detail_free').text(data.free_input);
        $('#detail_langs').text(data.language_input);
        $('#detail_strength').text(data.strength_input);
        $('#detail_style').text(data.style_input);
    } else {
        alert("해당 팀원 정보를 찾을 수 없습니다.");
    }
}

window.loadDetail = loadDetail;

$(document).ready(function () {
    loadTeamMembers();
});