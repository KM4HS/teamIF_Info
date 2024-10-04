import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

window.loadDetail = loadDetail;

const querySnapshot = await getDocs(collection(db, "TEAMIF_INFO"));
querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const docId = docSnapshot.id;

    let main_image = data['main_image'];
    let name = data['name_input'];
    let profile_image = data['profile_image'];
    let free = data['free_input'];
    let mbti = data['mbti_input'];

    // 이미지 예외처리
    let url = "https://images.unsplash.com/photo-1618005479492-bc36dc8aeaf2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    let cardHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${url}" class="card-img-top" style="object-fit: cover;"/>
                    <div class="card-body">
                        <h5 class="card-title" style="font-weight: bold;">${free}</h5>
                        <div class="card_down">
                            <div class="profile_img">
                                <img src="${url}"/>
                            </div>
                            <div class="profile_txt">
                                <span id="profile_name">${name}</span>
                                <span id="profile_mbti">${mbti}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ol class="breadcrumb" style="justify-content: flex-end;" data-doc="${docId}">
                    <li class="breadcrumb-item active detail_view" type="button">상세 보기</li>
                    <li class="breadcrumb-item active delete_button" type="button">삭제</li>
                </ol>
            </div>`;
    
    $('#cards_member_row').append(cardHTML);
});

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

$('.delete_button').click(async function (e) {
    let docId = e.target.parentElement.getAttribute('data-doc');
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

// 멤버 상세보기 버튼 클릭 -> 상세보기 페이지에 정보 출력
// TODO: 상세보기창 토글기능 필요
$('.detail_view').click(async function (e) {
    let doc_id = e.target.parentElement.getAttribute('data-doc');

    let array = fun(name, mbti)

    $('#profile_image').attr('src','profile_img_input');
    debugger
    $('#detail_name').text(name);
    $('#detail_mbti').text(mbti_input);
    $('#detail_blog').attr('href', blog_input);
    $('#detail_free').text(free_input);
    $('#detail_langs').text(language_input);
    $('#detail_strength').text(strength_input);
    $('#detail_style').text(style_input);
})

// 수정 버튼 클릭
$('#update_btn').click(async function (e) {
    let doc_id = e.target.parentElement.getAttribute('data-doc');
    let doc = await getDoc(doc(db, 'TEAMIF_INFO', doc_id));
    let row = doc.data();

    const name = row['name_input'];
    const mbti = row['mbti_input'];
    const free = row['free_input'];
    const language = row['language_input'];
    const strength = row['strength_input'];
    const style = row['style_input'];

    // const profile_image = row['profile_image'];
    // const main_image = row['main_image'];

    // $('#profile_image').src(profile_img_input);
    // $('#detail_blog').attr('href', blog_input);

    $('#detail_name').html(`<input id='name_input' value='${name}'>`);
    $('#detail_mbti').html(`<input id='mbti_input' value='${mbti}'>`);
    $('#detail_free').html(`<input id='free_input' value='${free}'>`);
    $('#detail_langs').html(`<input id='language_input' value='${language}'>`);
    $('#detail_strength').html(`<input id='strength_input' value='${strength}'>`);
    $('#detail_style').html(`<input id='style_input' value='${style}'>`);

    $('#update_btn').html(`<button id="update_done_btn" class="btn btn-dark" type="button" style="margin-left:auto" data-doc="${doc_id}">수정 완료</button>`);
})

// -> 수정 완료 버튼 클릭
$('#update_done_btn').click(async function (e) {
    let doc_id = e.target.parentElement.getAttribute('data-doc');

    let name_input = $('#name_input').val();
    let language_input = $('#language_input').val();
    let mbti_input = $('#mbti_input').val();
    let strength_input = $('#strength_input').val();
    let style_input = $('#style_input').val();
    let free_input = $('#free_input').val();

    let doc = {
        'name_input': name_input,
        'language_input': language_input,
        'mbti_input': mbti_input,
        'strength_input': strength_input,
        'style_input': style_input,
        'free_input': free_input,
    };

    await updateDoc(doc(db, "TEAMIF_INFO", doc_id), doc);
    alert('저장 완료!');
    window.location.href = "index_member.html";
})



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

