(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{269:function(e,o,i){e.exports={profile__row:"Profile_profile__row__1CVWG",profile__narrow:"Profile_profile__narrow__1OWXU",profile__wide:"Profile_profile__wide__18zXg",profile__me:"Profile_profile__me__3rVSh",meProfile__photo:"Profile_meProfile__photo__31lpA",meProfile__block:"Profile_meProfile__block__2Xu6f",refreshProfile__fake:"Profile_refreshProfile__fake__3hbm-",refreshProfile__input:"Profile_refreshProfile__input__uXC4n",refreshProfile__arrowTop:"Profile_refreshProfile__arrowTop__1HwEN",profile__edit:"Profile_profile__edit__21_4X",editProfile__settings:"Profile_editProfile__settings__2TiCS",editProfile__messages:"Profile_editProfile__messages__2UMg9",profile__enter:"Profile_profile__enter__u-Jpm",enterProfile__link:"Profile_enterProfile__link__1zvji",profile__info:"Profile_profile__info__3LONr",infoProfile__fullName:"Profile_infoProfile__fullName__28uuA",infoProfile__status:"Profile_infoProfile__status__2SFhu",statusProfile__user:"Profile_statusProfile__user__1TfzD",statusProfile__empty:"Profile_statusProfile__empty__1bxLY",infoProfile__line:"Profile_infoProfile__line__3Jgdk",informationProfile:"Profile_informationProfile__1oCrd",informationProfile__row:"Profile_informationProfile__row__3e5PC",informationProfile__title:"Profile_informationProfile__title__2tvxr",informationProfile__answer:"Profile_informationProfile__answer__2UYoY",infoProfile__showDetails:"Profile_infoProfile__showDetails__22RDe",profile__addPost:"Profile_profile__addPost__3b4r9",addPostProfile__row:"Profile_addPostProfile__row__3kzTp",addPostProfile__logo:"Profile_addPostProfile__logo__23IWY",preloader__profileWrapper:"Profile_preloader__profileWrapper__kbwou",preloader__profileBlock:"Profile_preloader__profileBlock__1RE-Y"}},270:function(e,o,i){e.exports={addPost__form:"ProfilePost_addPost__form__V73P5",addPost__textarea:"ProfilePost_addPost__textarea__2IIEd",addPost__button:"ProfilePost_addPost__button__2l3uW",addPost__input:"ProfilePost_addPost__input__39O1q",addPost__close:"ProfilePost_addPost__close__3_o1E"}},271:function(e,o,i){e.exports={profile__newPost:"ProfilePostList_profile__newPost__3QRUc",newPostProfileRemove:"ProfilePostList_newPostProfileRemove__2nJRU",newPostProfile:"ProfilePostList_newPostProfile__ZkUOf",newPostProfile__row:"ProfilePostList_newPostProfile__row__1Iatl",newPostProfile__logo:"ProfilePostList_newPostProfile__logo__5hIoe",newPostProfile__body:"ProfilePostList_newPostProfile__body__3vnUI",newPostProfile__name:"ProfilePostList_newPostProfile__name__3_Me3",newPostProfile__date:"ProfilePostList_newPostProfile__date__oQYEX",newPostProfileContent:"ProfilePostList_newPostProfileContent__1irN2"}},279:function(e,o,i){"use strict";i.r(o),i.d(o,"ProfileContainer",(function(){return y}));var t=i(0),r=i(28),s=i(1),a=i(269),l=i.n(a),n=i(15),f=i.n(n),_=i(12),c=i(21),P=i(10),d=i(33),j=i(61),m=i.p+"static/media/logo.94e5c599.jpg",p=i(30),b=i(31),u=i(4),h=i(85),O=i(270),x=i.n(O),w=i(266),g=i(265),N=Object(g.a)({form:"profilePost"})((function(e){return e.modalPost?Object(t.jsxs)(t.Fragment,{children:[Object(t.jsxs)("form",{onSubmit:e.handleSubmit,className:x.a.addPost__form,children:[Object(t.jsx)(w.a,{component:function(e){var o=e.input,i=Object(h.a)(e,["input"]),a=Object(s.useRef)(),l=Object(s.useState)(""),n=Object(r.a)(l,2),f=n[0],_=n[1];return Object(s.useEffect)((function(){a.current.style.height="2.8em";var e=a.current.scrollHeight;a.current.style.height="".concat(e,"px")}),[f]),Object(t.jsx)("textarea",Object(u.a)(Object(u.a)(Object(u.a)({},o),i),{},{ref:a,autoFocus:!0,className:x.a.addPost__textarea,value:f,onChange:function(e){return _(e.target.value)},placeholder:"Anything new?"}))},className:x.a.addPost__textarea,name:"post"}),Object(t.jsx)("button",{className:x.a.addPost__button,type:"submit",children:"Publish"})]}),Object(t.jsx)("div",{onClick:function(){return e.setModalPost(!1)},className:x.a.addPost__close,children:Object(t.jsx)(p.a,{icon:b.h})})]}):Object(t.jsx)("form",{onSubmit:e.handleSubmit,className:x.a.addPost__form,children:Object(t.jsx)(w.a,{component:"input",name:"posts",className:x.a.addPost__input,placeholder:"Anything new?",onClick:function(){return e.setModalPost(!0)},readOnly:!0})})})),v=i(271),I=i.n(v),S=function(e){var o=e.profilePosts.map((function(o){return Object(t.jsxs)("div",{className:I.a.profile__newPost,children:[Object(t.jsxs)("div",{className:f()(I.a.newPostProfile__row,I.a.newPostProfile),children:[Object(t.jsx)("div",{className:I.a.newPostProfile__logo,children:Object(t.jsx)("img",{src:e.profileMeInfo.photos.small})}),Object(t.jsxs)("div",{className:I.a.newPostProfile__body,children:[Object(t.jsx)("div",{className:I.a.newPostProfile__name,children:e.profileMeInfo.fullName}),Object(t.jsx)("div",{className:I.a.newPostProfile__date,children:o.date})]})]}),Object(t.jsx)("div",{className:I.a.newPostProfileContent,children:o.post}),Object(t.jsx)("div",{className:I.a.newPostProfileRemove,onClick:function(i){e.removeProfilePost(o.id)},children:Object(t.jsx)(p.a,{icon:b.h})})]},o.id)}));return Object(t.jsx)(t.Fragment,{children:o})},k=function(e){var o=Object(s.useState)(!1),i=Object(r.a)(o,2),a=i[0],n=i[1],_=Object(s.useState)(!1),P=Object(r.a)(_,2),d=P[0],j=P[1],u=function(){return new Date};return Object(t.jsx)("div",{className:l.a.profile,children:Object(t.jsxs)("div",{className:l.a.profile__row,children:[Object(t.jsxs)("div",{className:l.a.profile__narrow,children:[Object(t.jsx)("div",{className:l.a.profile__me,children:Object(t.jsxs)("div",{className:l.a.meProfile__photo,children:[Object(t.jsx)("img",{src:e.profileInfo.photos.small?e.profileInfo.photos.small:m}),e.isOwner&&Object(t.jsx)("div",{className:l.a.meProfile__block,children:Object(t.jsxs)("div",{className:l.a.meProfile__refresh,children:[Object(t.jsxs)("label",{className:l.a.refreshProfile__fake,htmlFor:"avatar-img",children:[Object(t.jsx)(p.a,{icon:b.a,className:l.a.refreshProfile__arrowTop}),Object(t.jsx)("span",{children:"Refresh photo"})]}),Object(t.jsx)("input",{className:l.a.refreshProfile__input,type:"file",id:"avatar-img",name:"avatar-img",onChange:function(o){!function(o){var i=o.target.files[0];e.setProfileImage(i)}(o)}})]})})]})}),e.isOwner?Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("div",{className:l.a.profile__edit,children:Object(t.jsx)(c.b,{className:l.a.editProfile__settings,to:"/settings",children:"Edit"})}),Object(t.jsx)("div",{className:l.a.profile__enter,children:Object(t.jsx)(c.b,{to:"/settings",children:Object(t.jsxs)("span",{children:[Object(t.jsx)(p.a,{icon:b.g,className:l.a.enterProfile__link}),"Enter your contacts"]})})})]}):Object(t.jsx)("div",{className:l.a.profile__edit,children:Object(t.jsx)(c.b,{className:l.a.editProfile__messages,to:"/messages",children:"Write a message"})})]}),Object(t.jsxs)("div",{className:l.a.profile__wide,children:[Object(t.jsxs)("div",{className:l.a.profile__info,children:[Object(t.jsx)("div",{className:l.a.infoProfile__fullName,children:Object(t.jsx)("h4",{children:e.profileInfo.fullName})}),e.isOwner?Object(t.jsx)("div",{className:l.a.infoProfile__status,children:Object(t.jsx)("div",{onClick:function(o){e.editModalStatus(!0)},children:e.profileStatus})}):Object(t.jsx)(t.Fragment,{children:e.profileStatus?Object(t.jsx)("div",{className:l.a.statusProfile__user,children:Object(t.jsx)("div",{children:e.profileStatus})}):Object(t.jsx)("div",{className:l.a.statusProfile__empty})}),Object(t.jsx)("div",{className:l.a.infoProfile__line}),Object(t.jsx)("div",{className:l.a.infoProfile__information,children:Object(t.jsxs)("div",{className:f()(l.a.informationProfile__row,l.a.informationProfile),children:[Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"About me: "}),e.profileInfo.aboutMe?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:e.profileInfo.aboutMe}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"Town: "}),e.profileInfo.lookingForAJobDescription?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:e.profileInfo.lookingForAJobDescription}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"Family status: "}),e.profileInfo.lookingForAJob?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"married"}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not married"})]})}),d?Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("div",{className:l.a.infoProfile__showDetails,onClick:function(e){return j(!1)},children:Object(t.jsx)("span",{children:"Hide detailed information"})}),Object(t.jsxs)("div",{className:l.a.infoProfile__information,children:[Object(t.jsx)("div",{className:l.a.infoProfile__line}),Object(t.jsxs)("div",{className:f()(l.a.informationProfile__row,l.a.informationProfile),children:[Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"YouTube: "}),e.profileInfo.contacts.youtube?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:e.profileInfo.contacts.youtube}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"Facebook: "}),e.profileInfo.contacts.facebook?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:e.profileInfo.contacts.facebook}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"LinkedIn: "}),e.profileInfo.contacts.website?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:e.profileInfo.contacts.website}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(t.jsx)("span",{className:l.a.informationProfile__title,children:"GitHub: "}),e.profileInfo.contacts.github?Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:e.profileInfo.contacts.github}):Object(t.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"})]})]})]}):Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("div",{className:l.a.infoProfile__showDetails,onClick:function(e){return j(!0)},children:Object(t.jsx)("span",{children:"Show details"})}),Object(t.jsx)("div",{})]}),Object(t.jsx)("div",{className:l.a.infoProfile__line})]}),e.isOwner&&e.isAuth&&Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("div",{className:l.a.profile__addPost,children:Object(t.jsxs)("div",{className:l.a.addPostProfile__row,children:[Object(t.jsx)("div",{className:l.a.addPostProfile__logo,children:Object(t.jsx)("img",{src:e.profileMeInfo.photos.small})}),Object(t.jsx)(N,{onSubmit:function(o){n(!1);var i="f".concat((+new Date).toString(16)),t="".concat(u().toLocaleDateString()," at ").concat(u().toLocaleTimeString()),r={id:i,post:o.post,date:t};e.addProfilePost(r)},setModalPost:n,modalPost:a})]})}),e.profilePosts.length>0&&Object(t.jsx)(S,{removeProfilePost:e.removeProfilePost,profileMeInfo:e.profileMeInfo,profilePosts:e.profilePosts})]})]})]})})},y=function(e){return Object(s.useEffect)((function(){var o=e.match.params.userId;o?(e.getProfileInfo(o),e.getProfileStatus(o)):(o=e.userId)?(e.getProfileInfo(o),e.getProfileMeInfo(o),e.getProfileStatus(o)):e.history.push("/login")}),[e.match.params.userId,e.profileImage,e.isAuth]),Object(t.jsx)(t.Fragment,{children:e.isAuth?e.profileInfo&&e.profileMeInfo?Object(t.jsx)(k,{removeProfilePost:e.removeProfilePost,profilePosts:e.profilePosts,addProfilePost:e.addProfilePost,profileMeInfo:e.profileMeInfo,modalStatus:e.modalStatus,editModalStatus:e.editModalStatus,profileInfo:e.profileInfo,birthday:e.birthday,lookingForAJobDescription:e.lookingForAJobDescription,setProfileImage:e.setProfileImage,isOwner:!e.match.params.userId,profileStatus:e.profileStatus,profileImage:e.profileImage,setProfileStatus:e.setProfileStatus,lookingForAJob:e.lookingForAJob,isAuth:e.isAuth}):Object(t.jsx)("div",{className:l.a.preloader__profileWrapper,children:Object(t.jsx)("div",{className:l.a.preloader__profileBlock,children:Object(t.jsx)(j.a,{})})}):e.profileInfo?Object(t.jsx)(k,{removeProfilePost:e.removeProfilePost,profilePosts:e.profilePosts,addProfilePost:e.addProfilePost,modalStatus:e.modalStatus,editModalStatus:e.editModalStatus,profileInfo:e.profileInfo,birthday:e.birthday,lookingForAJobDescription:e.lookingForAJobDescription,setProfileImage:e.setProfileImage,isOwner:!e.match.params.userId,profileStatus:e.profileStatus,profileImage:e.profileImage,setProfileStatus:e.setProfileStatus,lookingForAJob:e.lookingForAJob}):Object(t.jsx)("div",{className:l.a.preloader__profileWrapper,children:Object(t.jsx)("div",{className:l.a.preloader__profileBlock,children:Object(t.jsx)(j.a,{})})})})},F=Object(P.f)(y);o.default=Object(_.b)((function(e){return{userId:e.auth.id,isAuth:e.auth.isAuth,profileInfo:e.profile.profileInfo,profileImage:e.profile.profileImage,profileStatus:e.profile.profileStatus,profileMeInfo:e.profile.profileMeInfo,profilePosts:e.profile.profilePosts}}),(function(e){return{getProfileInfo:function(o){e(Object(d.c)(o))},setProfileImage:function(o){e(Object(d.h)(o))},getProfileStatus:function(o){e(Object(d.e)(o))},setProfileStatus:function(o){e(Object(d.i)(o))},getProfileMeInfo:function(o){e(Object(d.d)(o))},addProfilePost:function(o){e(Object(d.a)(o))},removeProfilePost:function(o){e(Object(d.f)(o))}}}))(F)}}]);
//# sourceMappingURL=3.63176ffb.chunk.js.map