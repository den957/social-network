(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[5],{269:function(e,o,i){e.exports={profile__row:"Profile_profile__row__1CVWG",profile__narrow:"Profile_profile__narrow__1OWXU",profile__wide:"Profile_profile__wide__18zXg",profile__me:"Profile_profile__me__3rVSh",meProfile__photo:"Profile_meProfile__photo__31lpA",meProfile__block:"Profile_meProfile__block__2Xu6f",refreshProfile__fake:"Profile_refreshProfile__fake__3hbm-",refreshProfile__input:"Profile_refreshProfile__input__uXC4n",refreshProfile__arrowTop:"Profile_refreshProfile__arrowTop__1HwEN",profile__edit:"Profile_profile__edit__21_4X",editProfile__settings:"Profile_editProfile__settings__2TiCS",editProfile__messages:"Profile_editProfile__messages__2UMg9",profile__enter:"Profile_profile__enter__u-Jpm",enterProfile__link:"Profile_enterProfile__link__1zvji",profile__info:"Profile_profile__info__3LONr",infoProfile__fullName:"Profile_infoProfile__fullName__28uuA",infoProfile__status:"Profile_infoProfile__status__2SFhu",infoProfile__fakeStatus:"Profile_infoProfile__fakeStatus__KX2pA",statusProfile__user:"Profile_statusProfile__user__1TfzD",statusProfile__empty:"Profile_statusProfile__empty__1bxLY",infoProfile__line:"Profile_infoProfile__line__3Jgdk",informationProfile:"Profile_informationProfile__1oCrd",informationProfile__row:"Profile_informationProfile__row__3e5PC",informationProfile__title:"Profile_informationProfile__title__2tvxr",informationProfile__answer:"Profile_informationProfile__answer__2UYoY",infoProfile__showDetails:"Profile_infoProfile__showDetails__22RDe",profile__addPost:"Profile_profile__addPost__3b4r9",addPostProfile__row:"Profile_addPostProfile__row__3kzTp",addPostProfile__logo:"Profile_addPostProfile__logo__23IWY",preloader__profileWrapper:"Profile_preloader__profileWrapper__kbwou",preloader__profileBlock:"Profile_preloader__profileBlock__1RE-Y"}},274:function(e,o,i){e.exports={addPost__form:"ProfilePost_addPost__form__V73P5",addPost__textarea:"ProfilePost_addPost__textarea__2IIEd",addPost__button:"ProfilePost_addPost__button__2l3uW",addPost__input:"ProfilePost_addPost__input__39O1q",addPost__close:"ProfilePost_addPost__close__3_o1E"}},275:function(e,o,i){e.exports={profile__newPost:"ProfilePostList_profile__newPost__3QRUc",newPostProfileRemove:"ProfilePostList_newPostProfileRemove__2nJRU",newPostProfile:"ProfilePostList_newPostProfile__ZkUOf",newPostProfile__row:"ProfilePostList_newPostProfile__row__1Iatl",newPostProfile__logo:"ProfilePostList_newPostProfile__logo__5hIoe",newPostProfile__body:"ProfilePostList_newPostProfile__body__3vnUI",newPostProfile__name:"ProfilePostList_newPostProfile__name__3_Me3",newPostProfile__date:"ProfilePostList_newPostProfile__date__oQYEX",newPostProfileContent:"ProfilePostList_newPostProfileContent__1irN2"}},286:function(e,o,i){"use strict";i.r(o),i.d(o,"ProfileContainer",(function(){return M}));var s=i(0),t=i(31),r=i(1),a=i(269),l=i.n(a),n=i(15),_=i(12),f=i(26),c=i(16),P=i.n(c),d=i(22),j=i.p+"static/media/logo.94e5c599.jpg",m=i(33),p=i(34),b=i(274),u=i.n(b),h=i(264),O=i(263),x=i(39),w=Object(O.a)({form:"profilePost"})((function(e){var o=e.modalPost,i=e.handleSubmit,t=e.setModalPost;return o?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("form",{onSubmit:i,className:u.a.addPost__form,children:[Object(s.jsx)(h.a,{component:x.a,className:u.a.addPost__textarea,name:"post"}),Object(s.jsx)("button",{className:u.a.addPost__button,type:"submit",children:"Publish"})]}),Object(s.jsx)("div",{onClick:function(){return t(!1)},className:u.a.addPost__close,children:Object(s.jsx)(m.a,{icon:p.i})})]}):Object(s.jsx)("form",{onSubmit:i,className:u.a.addPost__form,children:Object(s.jsx)(h.a,{component:"input",name:"posts",className:u.a.addPost__input,placeholder:"Anything new?",onClick:function(){return t(!0)},readOnly:!0})})})),N=i(275),g=i.n(N),v=function(e){var o=e.profilePosts,i=e.profileMeInfo,t=e.removeProfilePost,r=o.map((function(e){return Object(s.jsxs)("div",{className:g.a.profile__newPost,children:[Object(s.jsxs)("div",{className:P()(g.a.newPostProfile__row,g.a.newPostProfile),children:[Object(s.jsx)("div",{className:g.a.newPostProfile__logo,children:Object(s.jsx)("img",{src:i.photos.small})}),Object(s.jsxs)("div",{className:g.a.newPostProfile__body,children:[Object(s.jsx)("div",{className:g.a.newPostProfile__name,children:i.fullName}),Object(s.jsx)("div",{className:g.a.newPostProfile__date,children:e.date})]})]}),Object(s.jsx)("div",{className:g.a.newPostProfileContent,children:e.post}),Object(s.jsx)("div",{className:g.a.newPostProfileRemove,onClick:function(o){t(e.id)},children:Object(s.jsx)(m.a,{icon:p.i})})]},e.id)}));return Object(s.jsx)(s.Fragment,{children:r})},I=function(e){var o=e.setProfileImage,i=e.addProfilePost,a=e.profileInfo,n=e.isOwner,_=e.profileStatus,c=e.editModalStatus,b=e.isAuth,u=Object(t.a)(e,["setProfileImage","addProfilePost","profileInfo","isOwner","profileStatus","editModalStatus","isAuth"]),h=Object(r.useState)(!1),O=Object(f.a)(h,2),x=O[0],N=O[1],g=Object(r.useState)(!1),I=Object(f.a)(g,2),k=I[0],S=I[1],M=function(){return new Date};return Object(s.jsx)("div",{className:l.a.profile,children:Object(s.jsxs)("div",{className:l.a.profile__row,children:[Object(s.jsxs)("div",{className:l.a.profile__narrow,children:[Object(s.jsx)("div",{className:l.a.profile__me,children:Object(s.jsxs)("div",{className:l.a.meProfile__photo,children:[Object(s.jsx)("img",{src:a.photos.small?a.photos.small:j}),n&&Object(s.jsx)("div",{className:l.a.meProfile__block,children:Object(s.jsxs)("div",{className:l.a.meProfile__refresh,children:[Object(s.jsxs)("label",{className:l.a.refreshProfile__fake,htmlFor:"avatar-img",children:[Object(s.jsx)(m.a,{icon:p.a,className:l.a.refreshProfile__arrowTop}),Object(s.jsx)("span",{children:"Refresh photo"})]}),Object(s.jsx)("input",{className:l.a.refreshProfile__input,type:"file",id:"avatar-img",name:"avatar-img",onChange:function(e){!function(e){var i;(null===(i=e.target.files)||void 0===i?void 0:i.length)&&o(e.target.files[0])}(e)}})]})})]})}),n?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:l.a.profile__edit,children:Object(s.jsx)(d.b,{className:l.a.editProfile__settings,to:"/settings",children:"Edit"})}),Object(s.jsx)("div",{className:l.a.profile__enter,children:Object(s.jsx)(d.b,{to:"/settings",children:Object(s.jsxs)("span",{children:[Object(s.jsx)(m.a,{icon:p.g,className:l.a.enterProfile__link}),"Enter your contacts"]})})})]}):Object(s.jsx)("div",{className:l.a.profile__edit,children:Object(s.jsx)(d.b,{className:l.a.editProfile__messages,to:"/messages",children:"Write a message"})})]}),Object(s.jsxs)("div",{className:l.a.profile__wide,children:[Object(s.jsxs)("div",{className:l.a.profile__info,children:[Object(s.jsx)("div",{className:l.a.infoProfile__fullName,children:Object(s.jsx)("h4",{children:a.fullName})}),n?Object(s.jsx)(s.Fragment,{children:_?Object(s.jsx)("div",{className:l.a.infoProfile__status,children:Object(s.jsx)("div",{onClick:function(e){c(!0)},children:_})}):Object(s.jsx)("div",{className:l.a.infoProfile__status,children:Object(s.jsx)("div",{className:l.a.infoProfile__fakeStatus,onClick:function(){c(!0)},children:"status"})})}):Object(s.jsx)(s.Fragment,{children:_?Object(s.jsx)("div",{className:l.a.statusProfile__user,children:Object(s.jsx)("div",{children:_})}):Object(s.jsx)("div",{className:l.a.statusProfile__empty})}),Object(s.jsx)("div",{className:l.a.infoProfile__line}),Object(s.jsx)("div",{className:l.a.infoProfile__information,children:Object(s.jsxs)("div",{className:P()(l.a.informationProfile__row,l.a.informationProfile),children:[Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"About me: "}),a.aboutMe?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:a.aboutMe}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"Town: "}),a.lookingForAJobDescription?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:a.lookingForAJobDescription}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"Family status: "}),a.lookingForAJob?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"married"}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not married"})]})}),k?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:l.a.infoProfile__showDetails,onClick:function(){return S(!1)},children:Object(s.jsx)("span",{children:"Hide detailed information"})}),Object(s.jsxs)("div",{className:l.a.infoProfile__information,children:[Object(s.jsx)("div",{className:l.a.infoProfile__line}),Object(s.jsxs)("div",{className:P()(l.a.informationProfile__row,l.a.informationProfile),children:[Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"YouTube: "}),a.contacts.youtube?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:a.contacts.youtube}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"Facebook: "}),a.contacts.facebook?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:a.contacts.facebook}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"LinkedIn: "}),a.contacts.website?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:a.contacts.website}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"}),Object(s.jsx)("span",{className:l.a.informationProfile__title,children:"GitHub: "}),a.contacts.github?Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:a.contacts.github}):Object(s.jsx)("span",{className:l.a.informationProfile__answer,children:"not specified"})]})]})]}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:l.a.infoProfile__showDetails,onClick:function(e){return S(!0)},children:Object(s.jsx)("span",{children:"Show details"})}),Object(s.jsx)("div",{})]}),Object(s.jsx)("div",{className:l.a.infoProfile__line})]}),n&&b&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:l.a.profile__addPost,children:Object(s.jsxs)("div",{className:l.a.addPostProfile__row,children:[Object(s.jsx)("div",{className:l.a.addPostProfile__logo,children:Object(s.jsx)("img",{src:u.profileMeInfo.photos.small})}),Object(s.jsx)(w,{onSubmit:function(e){N(!1);var o="f".concat((+new Date).toString(16)),s="".concat(M().toLocaleDateString()," at ").concat(M().toLocaleTimeString()),t={id:o,post:e.post,date:s};i(t)},setModalPost:N,modalPost:x})]})}),u.profilePosts.length>0&&Object(s.jsx)(v,{removeProfilePost:u.removeProfilePost,profileMeInfo:u.profileMeInfo,profilePosts:u.profilePosts})]})]})]})})},k=i(57),S=i(36),M=function(e){var o=e.match,i=e.history,a=e.userId,n=e.getProfileInfo,_=e.getProfileMeInfo,f=e.getProfileStatus,c=e.profileImage,P=Object(t.a)(e,["match","history","userId","getProfileInfo","getProfileMeInfo","getProfileStatus","profileImage"]);return Object(r.useEffect)((function(){var e=+o.params.userId;e?(n(e),f(e)):a?(n(a),_(a),f(a)):i.push("/login")}),[o.params.userId,c,P.isAuth]),Object(s.jsx)(s.Fragment,{children:P.isAuth?Object(s.jsx)(s.Fragment,{children:P.profileInfo&&P.profileMeInfo?Object(s.jsx)(I,{removeProfilePost:P.removeProfilePost,profilePosts:P.profilePosts,addProfilePost:P.addProfilePost,profileMeInfo:P.profileMeInfo,editModalStatus:P.editModalStatus,profileInfo:P.profileInfo,setProfileImage:P.setProfileImage,isOwner:!o.params.userId,profileStatus:P.profileStatus,isAuth:P.isAuth}):Object(s.jsx)("div",{className:l.a.preloader__profileWrapper,children:Object(s.jsx)("div",{className:l.a.preloader__profileBlock,children:Object(s.jsx)(k.a,{})})})}):Object(s.jsx)(s.Fragment,{children:P.profileInfo?Object(s.jsx)(I,{removeProfilePost:P.removeProfilePost,profilePosts:P.profilePosts,addProfilePost:P.addProfilePost,profileMeInfo:P.profileMeInfo,editModalStatus:P.editModalStatus,profileInfo:P.profileInfo,setProfileImage:P.setProfileImage,isOwner:!o.params.userId,profileStatus:P.profileStatus,isAuth:P.isAuth}):Object(s.jsx)("div",{className:l.a.preloader__profileWrapper,children:Object(s.jsx)("div",{className:l.a.preloader__profileBlock,children:Object(s.jsx)(k.a,{})})})})})},y=Object(_.f)(M);o.default=Object(n.b)((function(e){return{userId:e.auth.id,isAuth:e.auth.isAuth,profileInfo:e.profile.profileInfo,profileStatus:e.profile.profileStatus,profileMeInfo:e.profile.profileMeInfo,profilePosts:e.profile.profilePosts,profileImage:e.profile.profileImage}}),(function(e){return{getProfileInfo:function(o){e(Object(S.c)(o))},setProfileImage:function(o){e(Object(S.h)(o))},getProfileStatus:function(o){e(Object(S.e)(o))},getProfileMeInfo:function(o){e(Object(S.d)(o))},addProfilePost:function(o){e(Object(S.a)(o))},removeProfilePost:function(o){e(Object(S.f)(o))}}}))(y)}}]);
//# sourceMappingURL=5.070e3664.chunk.js.map