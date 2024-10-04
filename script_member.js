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

// 멤버 상세보기 버튼 클릭 -> 상세보기 페이지에 정보 출력
// TODO: 상세보기창 토글기능 필요
$('.detail_view').click(async function(e){
    let doc_id = e.target.parentElement.getAttribute('data-doc');

    let doc = await getDoc(doc(db, 'TEAMIF_INFO', doc_id));
    let row = doc.data();

    let profile_img_input = row['profile_image'];
    let name_input = row['name_input'];
    let language_input = row['language_input'];
    let mbti_input = row['mbti_input'];
    let strength_input = row['strength_input'];
    let style_input = row['style_input'];
    let free_input = row['free_input'];
    let blog_input = row['blog_input'];

    $('#profile_image').src(profile_img_input);
    $('#detail_name').text(name_input);
    $('#detail_mbti').text(mbti_input);
    $('#detail_blog').href(blog_input);
    $('#detail_free').text(free_input);
    $('#detail_langs').text(language_input);
    $('#detail_strength').text(strength_input);
    $('#detail_style').text(style_input);
})

$('.detail_update').click(function (e){
    let doc_id = e.target.parentElement.getAttribute('data-doc');

    //TODO: 수정 적용 function(doc_id) 필요
    window.location.href = "index_member.html";
    update_member(doc_id);
})

// 멤버 정보 수정 함수
async function update_member(doc_id){
    let doc_detail = await getDoc(doc(db, 'TEAMIF_INFO', doc_id));
    let row = doc_detail.data();

    $('#name_input').placeholder(row['name_input']);
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
}