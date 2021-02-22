

/* this ALWAYS GENERATED file contains the definitions for the interfaces */


 /* File created by MIDL compiler version 8.xx.xxxx */
/* at a redacted point in time
 */
/* Compiler settings for ../../edge_embedded_browser/client/win/current/webview2experimental.idl:
    Oicf, W1, Zp8, env=Win64 (32b run), target_arch=AMD64 8.xx.xxxx 
    protocol : dce , ms_ext, c_ext, robust
    error checks: allocation ref bounds_check enum stub_data 
    VC __declspec() decoration level: 
         __declspec(uuid()), __declspec(selectany), __declspec(novtable)
         DECLSPEC_UUID(), MIDL_INTERFACE()
*/
/* @@MIDL_FILE_HEADING(  ) */

#pragma warning( disable: 4049 )  /* more than 64k source lines */


/* verify that the <rpcndr.h> version is high enough to compile this file*/
#ifndef __REQUIRED_RPCNDR_H_VERSION__
#define __REQUIRED_RPCNDR_H_VERSION__ 475
#endif

#include "rpc.h"
#include "rpcndr.h"

#ifndef __RPCNDR_H_VERSION__
#error this stub requires an updated version of <rpcndr.h>
#endif /* __RPCNDR_H_VERSION__ */


#ifndef __webview2experimental_h__
#define __webview2experimental_h__

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif

/* Forward Declarations */ 

#ifndef __ICoreWebView2ExperimentalCompositionControllerInterop_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCompositionControllerInterop_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCompositionControllerInterop ICoreWebView2ExperimentalCompositionControllerInterop;

#endif 	/* __ICoreWebView2ExperimentalCompositionControllerInterop_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCompositionController_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCompositionController_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCompositionController ICoreWebView2ExperimentalCompositionController;

#endif 	/* __ICoreWebView2ExperimentalCompositionController_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCompositionController2_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCompositionController2_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCompositionController2 ICoreWebView2ExperimentalCompositionController2;

#endif 	/* __ICoreWebView2ExperimentalCompositionController2_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCookie_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCookie_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCookie ICoreWebView2ExperimentalCookie;

#endif 	/* __ICoreWebView2ExperimentalCookie_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCookieList_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCookieList_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCookieList ICoreWebView2ExperimentalCookieList;

#endif 	/* __ICoreWebView2ExperimentalCookieList_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCookieManager_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCookieManager_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCookieManager ICoreWebView2ExperimentalCookieManager;

#endif 	/* __ICoreWebView2ExperimentalCookieManager_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler;

#endif 	/* __ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalDOMContentLoadedEventArgs_FWD_DEFINED__
#define __ICoreWebView2ExperimentalDOMContentLoadedEventArgs_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalDOMContentLoadedEventArgs ICoreWebView2ExperimentalDOMContentLoadedEventArgs;

#endif 	/* __ICoreWebView2ExperimentalDOMContentLoadedEventArgs_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalDOMContentLoadedEventHandler_FWD_DEFINED__
#define __ICoreWebView2ExperimentalDOMContentLoadedEventHandler_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalDOMContentLoadedEventHandler ICoreWebView2ExperimentalDOMContentLoadedEventHandler;

#endif 	/* __ICoreWebView2ExperimentalDOMContentLoadedEventHandler_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalEnvironmentInterop_FWD_DEFINED__
#define __ICoreWebView2ExperimentalEnvironmentInterop_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalEnvironmentInterop ICoreWebView2ExperimentalEnvironmentInterop;

#endif 	/* __ICoreWebView2ExperimentalEnvironmentInterop_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalGetCookiesCompletedHandler_FWD_DEFINED__
#define __ICoreWebView2ExperimentalGetCookiesCompletedHandler_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalGetCookiesCompletedHandler ICoreWebView2ExperimentalGetCookiesCompletedHandler;

#endif 	/* __ICoreWebView2ExperimentalGetCookiesCompletedHandler_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalPointerInfo_FWD_DEFINED__
#define __ICoreWebView2ExperimentalPointerInfo_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalPointerInfo ICoreWebView2ExperimentalPointerInfo;

#endif 	/* __ICoreWebView2ExperimentalPointerInfo_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCursorChangedEventHandler_FWD_DEFINED__
#define __ICoreWebView2ExperimentalCursorChangedEventHandler_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalCursorChangedEventHandler ICoreWebView2ExperimentalCursorChangedEventHandler;

#endif 	/* __ICoreWebView2ExperimentalCursorChangedEventHandler_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_FWD_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler;

#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_FWD_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs;

#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseView_FWD_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseView_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalWebResourceResponseView ICoreWebView2ExperimentalWebResourceResponseView;

#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseView_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_FWD_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler;

#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_FWD_DEFINED__ */


#ifndef __ICoreWebView2Experimental_FWD_DEFINED__
#define __ICoreWebView2Experimental_FWD_DEFINED__
typedef interface ICoreWebView2Experimental ICoreWebView2Experimental;

#endif 	/* __ICoreWebView2Experimental_FWD_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalEnvironment_FWD_DEFINED__
#define __ICoreWebView2ExperimentalEnvironment_FWD_DEFINED__
typedef interface ICoreWebView2ExperimentalEnvironment ICoreWebView2ExperimentalEnvironment;

#endif 	/* __ICoreWebView2ExperimentalEnvironment_FWD_DEFINED__ */


/* header files for imported files */
#include "webview2.h"

#ifdef __cplusplus
extern "C"{
#endif 



#ifndef __WebView2Experimental_LIBRARY_DEFINED__
#define __WebView2Experimental_LIBRARY_DEFINED__

/* library WebView2Experimental */
/* [version][uuid] */ 



















typedef /* [v1_enum] */ 
enum COREWEBVIEW2_COOKIE_SAME_SITE_KIND
    {
        COREWEBVIEW2_COOKIE_SAME_SITE_KIND_NONE	= 0,
        COREWEBVIEW2_COOKIE_SAME_SITE_KIND_LAX	= ( COREWEBVIEW2_COOKIE_SAME_SITE_KIND_NONE + 1 ) ,
        COREWEBVIEW2_COOKIE_SAME_SITE_KIND_STRICT	= ( COREWEBVIEW2_COOKIE_SAME_SITE_KIND_LAX + 1 ) 
    } 	COREWEBVIEW2_COOKIE_SAME_SITE_KIND;

typedef /* [v1_enum] */ 
enum COREWEBVIEW2_MOUSE_EVENT_KIND
    {
        COREWEBVIEW2_MOUSE_EVENT_KIND_HORIZONTAL_WHEEL	= 0x20e,
        COREWEBVIEW2_MOUSE_EVENT_KIND_LEFT_BUTTON_DOUBLE_CLICK	= 0x203,
        COREWEBVIEW2_MOUSE_EVENT_KIND_LEFT_BUTTON_DOWN	= 0x201,
        COREWEBVIEW2_MOUSE_EVENT_KIND_LEFT_BUTTON_UP	= 0x202,
        COREWEBVIEW2_MOUSE_EVENT_KIND_LEAVE	= 0x2a3,
        COREWEBVIEW2_MOUSE_EVENT_KIND_MIDDLE_BUTTON_DOUBLE_CLICK	= 0x209,
        COREWEBVIEW2_MOUSE_EVENT_KIND_MIDDLE_BUTTON_DOWN	= 0x207,
        COREWEBVIEW2_MOUSE_EVENT_KIND_MIDDLE_BUTTON_UP	= 0x208,
        COREWEBVIEW2_MOUSE_EVENT_KIND_MOVE	= 0x200,
        COREWEBVIEW2_MOUSE_EVENT_KIND_RIGHT_BUTTON_DOUBLE_CLICK	= 0x206,
        COREWEBVIEW2_MOUSE_EVENT_KIND_RIGHT_BUTTON_DOWN	= 0x204,
        COREWEBVIEW2_MOUSE_EVENT_KIND_RIGHT_BUTTON_UP	= 0x205,
        COREWEBVIEW2_MOUSE_EVENT_KIND_WHEEL	= 0x20a,
        COREWEBVIEW2_MOUSE_EVENT_KIND_X_BUTTON_DOUBLE_CLICK	= 0x20d,
        COREWEBVIEW2_MOUSE_EVENT_KIND_X_BUTTON_DOWN	= 0x20b,
        COREWEBVIEW2_MOUSE_EVENT_KIND_X_BUTTON_UP	= 0x20c
    } 	COREWEBVIEW2_MOUSE_EVENT_KIND;

typedef /* [v1_enum] */ 
enum COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS
    {
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_NONE	= 0,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_LEFT_BUTTON	= 0x1,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_RIGHT_BUTTON	= 0x2,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_SHIFT	= 0x4,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_CONTROL	= 0x8,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_MIDDLE_BUTTON	= 0x10,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_X_BUTTON1	= 0x20,
        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS_X_BUTTON2	= 0x40
    } 	COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS;

DEFINE_ENUM_FLAG_OPERATORS(COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS);
typedef struct COREWEBVIEW2_MATRIX_4X4
    {
    FLOAT _11;
    FLOAT _12;
    FLOAT _13;
    FLOAT _14;
    FLOAT _21;
    FLOAT _22;
    FLOAT _23;
    FLOAT _24;
    FLOAT _31;
    FLOAT _32;
    FLOAT _33;
    FLOAT _34;
    FLOAT _41;
    FLOAT _42;
    FLOAT _43;
    FLOAT _44;
    } 	COREWEBVIEW2_MATRIX_4X4;

typedef /* [v1_enum] */ 
enum COREWEBVIEW2_POINTER_EVENT_KIND
    {
        COREWEBVIEW2_POINTER_EVENT_KIND_ACTIVATE	= 0x24b,
        COREWEBVIEW2_POINTER_EVENT_KIND_DOWN	= 0x246,
        COREWEBVIEW2_POINTER_EVENT_KIND_ENTER	= 0x249,
        COREWEBVIEW2_POINTER_EVENT_KIND_LEAVE	= 0x24a,
        COREWEBVIEW2_POINTER_EVENT_KIND_UP	= 0x247,
        COREWEBVIEW2_POINTER_EVENT_KIND_UPDATE	= 0x245
    } 	COREWEBVIEW2_POINTER_EVENT_KIND;


EXTERN_C const IID LIBID_WebView2Experimental;

#ifndef __ICoreWebView2ExperimentalCompositionControllerInterop_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCompositionControllerInterop_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCompositionControllerInterop */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCompositionControllerInterop;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("4B60F2C9-88BB-42F4-9C4F-3C0D0ED17072")
    ICoreWebView2ExperimentalCompositionControllerInterop : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_UIAProvider( 
            /* [retval][out] */ IUnknown **provider) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_RootVisualTarget( 
            /* [retval][out] */ IUnknown **target) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_RootVisualTarget( 
            /* [in] */ IUnknown *target) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCompositionControllerInteropVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCompositionControllerInterop * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCompositionControllerInterop * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCompositionControllerInterop * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_UIAProvider )( 
            ICoreWebView2ExperimentalCompositionControllerInterop * This,
            /* [retval][out] */ IUnknown **provider);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_RootVisualTarget )( 
            ICoreWebView2ExperimentalCompositionControllerInterop * This,
            /* [retval][out] */ IUnknown **target);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_RootVisualTarget )( 
            ICoreWebView2ExperimentalCompositionControllerInterop * This,
            /* [in] */ IUnknown *target);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCompositionControllerInteropVtbl;

    interface ICoreWebView2ExperimentalCompositionControllerInterop
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCompositionControllerInteropVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCompositionControllerInterop_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCompositionControllerInterop_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCompositionControllerInterop_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCompositionControllerInterop_get_UIAProvider(This,provider)	\
    ( (This)->lpVtbl -> get_UIAProvider(This,provider) ) 

#define ICoreWebView2ExperimentalCompositionControllerInterop_get_RootVisualTarget(This,target)	\
    ( (This)->lpVtbl -> get_RootVisualTarget(This,target) ) 

#define ICoreWebView2ExperimentalCompositionControllerInterop_put_RootVisualTarget(This,target)	\
    ( (This)->lpVtbl -> put_RootVisualTarget(This,target) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCompositionControllerInterop_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCompositionController_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCompositionController_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCompositionController */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCompositionController;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("584903b6-f79f-4037-8676-1b13d678163a")
    ICoreWebView2ExperimentalCompositionController : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_UIAProvider( 
            /* [retval][out] */ IUnknown **provider) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_RootVisualTarget( 
            /* [retval][out] */ IUnknown **target) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_RootVisualTarget( 
            /* [in] */ IUnknown *target) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE SendMouseInput( 
            /* [in] */ COREWEBVIEW2_MOUSE_EVENT_KIND eventKind,
            /* [in] */ COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS virtualKeys,
            /* [in] */ UINT32 mouseData,
            /* [in] */ POINT point) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE CreateCoreWebView2PointerInfoFromPointerId( 
            /* [in] */ UINT pointerId,
            /* [in] */ HWND parentWindow,
            /* [in] */ struct COREWEBVIEW2_MATRIX_4X4 transform,
            /* [retval][out] */ ICoreWebView2ExperimentalPointerInfo **pointerInfo) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE SendPointerInput( 
            /* [in] */ COREWEBVIEW2_POINTER_EVENT_KIND eventKind,
            /* [in] */ ICoreWebView2ExperimentalPointerInfo *pointerInfo) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Cursor( 
            /* [retval][out] */ HCURSOR *cursor) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE add_CursorChanged( 
            /* [in] */ ICoreWebView2ExperimentalCursorChangedEventHandler *eventHandler,
            /* [out] */ EventRegistrationToken *token) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE remove_CursorChanged( 
            /* [in] */ EventRegistrationToken token) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCompositionControllerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCompositionController * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCompositionController * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_UIAProvider )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [retval][out] */ IUnknown **provider);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_RootVisualTarget )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [retval][out] */ IUnknown **target);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_RootVisualTarget )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ IUnknown *target);
        
        HRESULT ( STDMETHODCALLTYPE *SendMouseInput )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ COREWEBVIEW2_MOUSE_EVENT_KIND eventKind,
            /* [in] */ COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS virtualKeys,
            /* [in] */ UINT32 mouseData,
            /* [in] */ POINT point);
        
        HRESULT ( STDMETHODCALLTYPE *CreateCoreWebView2PointerInfoFromPointerId )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ UINT pointerId,
            /* [in] */ HWND parentWindow,
            /* [in] */ struct COREWEBVIEW2_MATRIX_4X4 transform,
            /* [retval][out] */ ICoreWebView2ExperimentalPointerInfo **pointerInfo);
        
        HRESULT ( STDMETHODCALLTYPE *SendPointerInput )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ COREWEBVIEW2_POINTER_EVENT_KIND eventKind,
            /* [in] */ ICoreWebView2ExperimentalPointerInfo *pointerInfo);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Cursor )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [retval][out] */ HCURSOR *cursor);
        
        HRESULT ( STDMETHODCALLTYPE *add_CursorChanged )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ ICoreWebView2ExperimentalCursorChangedEventHandler *eventHandler,
            /* [out] */ EventRegistrationToken *token);
        
        HRESULT ( STDMETHODCALLTYPE *remove_CursorChanged )( 
            ICoreWebView2ExperimentalCompositionController * This,
            /* [in] */ EventRegistrationToken token);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCompositionControllerVtbl;

    interface ICoreWebView2ExperimentalCompositionController
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCompositionControllerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCompositionController_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCompositionController_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCompositionController_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCompositionController_get_UIAProvider(This,provider)	\
    ( (This)->lpVtbl -> get_UIAProvider(This,provider) ) 

#define ICoreWebView2ExperimentalCompositionController_get_RootVisualTarget(This,target)	\
    ( (This)->lpVtbl -> get_RootVisualTarget(This,target) ) 

#define ICoreWebView2ExperimentalCompositionController_put_RootVisualTarget(This,target)	\
    ( (This)->lpVtbl -> put_RootVisualTarget(This,target) ) 

#define ICoreWebView2ExperimentalCompositionController_SendMouseInput(This,eventKind,virtualKeys,mouseData,point)	\
    ( (This)->lpVtbl -> SendMouseInput(This,eventKind,virtualKeys,mouseData,point) ) 

#define ICoreWebView2ExperimentalCompositionController_CreateCoreWebView2PointerInfoFromPointerId(This,pointerId,parentWindow,transform,pointerInfo)	\
    ( (This)->lpVtbl -> CreateCoreWebView2PointerInfoFromPointerId(This,pointerId,parentWindow,transform,pointerInfo) ) 

#define ICoreWebView2ExperimentalCompositionController_SendPointerInput(This,eventKind,pointerInfo)	\
    ( (This)->lpVtbl -> SendPointerInput(This,eventKind,pointerInfo) ) 

#define ICoreWebView2ExperimentalCompositionController_get_Cursor(This,cursor)	\
    ( (This)->lpVtbl -> get_Cursor(This,cursor) ) 

#define ICoreWebView2ExperimentalCompositionController_add_CursorChanged(This,eventHandler,token)	\
    ( (This)->lpVtbl -> add_CursorChanged(This,eventHandler,token) ) 

#define ICoreWebView2ExperimentalCompositionController_remove_CursorChanged(This,token)	\
    ( (This)->lpVtbl -> remove_CursorChanged(This,token) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCompositionController_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCompositionController2_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCompositionController2_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCompositionController2 */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCompositionController2;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("279ae616-b7cb-4946-8da3-dc853645d2ba")
    ICoreWebView2ExperimentalCompositionController2 : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_SystemCursorId( 
            /* [retval][out] */ UINT32 *systemCursorId) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCompositionController2Vtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCompositionController2 * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCompositionController2 * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCompositionController2 * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_SystemCursorId )( 
            ICoreWebView2ExperimentalCompositionController2 * This,
            /* [retval][out] */ UINT32 *systemCursorId);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCompositionController2Vtbl;

    interface ICoreWebView2ExperimentalCompositionController2
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCompositionController2Vtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCompositionController2_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCompositionController2_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCompositionController2_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCompositionController2_get_SystemCursorId(This,systemCursorId)	\
    ( (This)->lpVtbl -> get_SystemCursorId(This,systemCursorId) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCompositionController2_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCookie_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCookie_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCookie */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCookie;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("33DB4D8E-F5F7-4B45-9442-6690263377C2")
    ICoreWebView2ExperimentalCookie : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Name( 
            /* [retval][out] */ LPWSTR *name) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Value( 
            /* [retval][out] */ LPWSTR *value) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_Value( 
            /* [in] */ LPCWSTR value) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Domain( 
            /* [retval][out] */ LPWSTR *domain) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Path( 
            /* [retval][out] */ LPWSTR *path) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Expires( 
            /* [retval][out] */ double *expires) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_Expires( 
            /* [in] */ double expires) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_IsHttpOnly( 
            /* [retval][out] */ BOOL *isHttpOnly) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_IsHttpOnly( 
            /* [in] */ BOOL isHttpOnly) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_SameSite( 
            /* [retval][out] */ COREWEBVIEW2_COOKIE_SAME_SITE_KIND *sameSite) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_SameSite( 
            /* [in] */ COREWEBVIEW2_COOKIE_SAME_SITE_KIND sameSite) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_IsSecure( 
            /* [retval][out] */ BOOL *isSecure) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_IsSecure( 
            /* [in] */ BOOL isSecure) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_IsSession( 
            /* [retval][out] */ BOOL *isSession) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCookieVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCookie * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCookie * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Name )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ LPWSTR *name);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Value )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ LPWSTR *value);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_Value )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [in] */ LPCWSTR value);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Domain )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ LPWSTR *domain);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Path )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ LPWSTR *path);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Expires )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ double *expires);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_Expires )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [in] */ double expires);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_IsHttpOnly )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ BOOL *isHttpOnly);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_IsHttpOnly )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [in] */ BOOL isHttpOnly);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_SameSite )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ COREWEBVIEW2_COOKIE_SAME_SITE_KIND *sameSite);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_SameSite )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [in] */ COREWEBVIEW2_COOKIE_SAME_SITE_KIND sameSite);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_IsSecure )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ BOOL *isSecure);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_IsSecure )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [in] */ BOOL isSecure);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_IsSession )( 
            ICoreWebView2ExperimentalCookie * This,
            /* [retval][out] */ BOOL *isSession);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCookieVtbl;

    interface ICoreWebView2ExperimentalCookie
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCookieVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCookie_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCookie_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCookie_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCookie_get_Name(This,name)	\
    ( (This)->lpVtbl -> get_Name(This,name) ) 

#define ICoreWebView2ExperimentalCookie_get_Value(This,value)	\
    ( (This)->lpVtbl -> get_Value(This,value) ) 

#define ICoreWebView2ExperimentalCookie_put_Value(This,value)	\
    ( (This)->lpVtbl -> put_Value(This,value) ) 

#define ICoreWebView2ExperimentalCookie_get_Domain(This,domain)	\
    ( (This)->lpVtbl -> get_Domain(This,domain) ) 

#define ICoreWebView2ExperimentalCookie_get_Path(This,path)	\
    ( (This)->lpVtbl -> get_Path(This,path) ) 

#define ICoreWebView2ExperimentalCookie_get_Expires(This,expires)	\
    ( (This)->lpVtbl -> get_Expires(This,expires) ) 

#define ICoreWebView2ExperimentalCookie_put_Expires(This,expires)	\
    ( (This)->lpVtbl -> put_Expires(This,expires) ) 

#define ICoreWebView2ExperimentalCookie_get_IsHttpOnly(This,isHttpOnly)	\
    ( (This)->lpVtbl -> get_IsHttpOnly(This,isHttpOnly) ) 

#define ICoreWebView2ExperimentalCookie_put_IsHttpOnly(This,isHttpOnly)	\
    ( (This)->lpVtbl -> put_IsHttpOnly(This,isHttpOnly) ) 

#define ICoreWebView2ExperimentalCookie_get_SameSite(This,sameSite)	\
    ( (This)->lpVtbl -> get_SameSite(This,sameSite) ) 

#define ICoreWebView2ExperimentalCookie_put_SameSite(This,sameSite)	\
    ( (This)->lpVtbl -> put_SameSite(This,sameSite) ) 

#define ICoreWebView2ExperimentalCookie_get_IsSecure(This,isSecure)	\
    ( (This)->lpVtbl -> get_IsSecure(This,isSecure) ) 

#define ICoreWebView2ExperimentalCookie_put_IsSecure(This,isSecure)	\
    ( (This)->lpVtbl -> put_IsSecure(This,isSecure) ) 

#define ICoreWebView2ExperimentalCookie_get_IsSession(This,isSession)	\
    ( (This)->lpVtbl -> get_IsSession(This,isSession) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCookie_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCookieList_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCookieList_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCookieList */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCookieList;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("F16D4F6A-7154-4644-90FA-03E03F54D974")
    ICoreWebView2ExperimentalCookieList : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Count( 
            /* [retval][out] */ UINT *count) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE GetValueAtIndex( 
            /* [in] */ UINT index,
            /* [retval][out] */ ICoreWebView2ExperimentalCookie **cookie) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCookieListVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCookieList * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCookieList * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCookieList * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Count )( 
            ICoreWebView2ExperimentalCookieList * This,
            /* [retval][out] */ UINT *count);
        
        HRESULT ( STDMETHODCALLTYPE *GetValueAtIndex )( 
            ICoreWebView2ExperimentalCookieList * This,
            /* [in] */ UINT index,
            /* [retval][out] */ ICoreWebView2ExperimentalCookie **cookie);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCookieListVtbl;

    interface ICoreWebView2ExperimentalCookieList
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCookieListVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCookieList_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCookieList_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCookieList_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCookieList_get_Count(This,count)	\
    ( (This)->lpVtbl -> get_Count(This,count) ) 

#define ICoreWebView2ExperimentalCookieList_GetValueAtIndex(This,index,cookie)	\
    ( (This)->lpVtbl -> GetValueAtIndex(This,index,cookie) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCookieList_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCookieManager_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCookieManager_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCookieManager */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCookieManager;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("C513F99E-5CCF-4914-9266-AF635A1D34AD")
    ICoreWebView2ExperimentalCookieManager : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE CreateCookie( 
            /* [in] */ LPCWSTR name,
            /* [in] */ LPCWSTR value,
            /* [in] */ LPCWSTR domain,
            /* [in] */ LPCWSTR path,
            /* [retval][out] */ ICoreWebView2ExperimentalCookie **cookie) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE CreateCookieWithCookie( 
            /* [in] */ ICoreWebView2ExperimentalCookie *cookieParam,
            /* [retval][out] */ ICoreWebView2ExperimentalCookie **cookie) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE GetCookies( 
            /* [in] */ LPCWSTR uri,
            /* [in] */ ICoreWebView2ExperimentalGetCookiesCompletedHandler *handler) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE AddOrUpdateCookie( 
            /* [in] */ ICoreWebView2ExperimentalCookie *cookie) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE DeleteCookie( 
            /* [in] */ ICoreWebView2ExperimentalCookie *cookie) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE DeleteCookies( 
            /* [in] */ LPCWSTR name,
            /* [in] */ LPCWSTR uri) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE DeleteCookiesWithDomainAndPath( 
            /* [in] */ LPCWSTR name,
            /* [in] */ LPCWSTR domain,
            /* [in] */ LPCWSTR path) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE DeleteAllCookies( void) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCookieManagerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCookieManager * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCookieManager * This);
        
        HRESULT ( STDMETHODCALLTYPE *CreateCookie )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ LPCWSTR name,
            /* [in] */ LPCWSTR value,
            /* [in] */ LPCWSTR domain,
            /* [in] */ LPCWSTR path,
            /* [retval][out] */ ICoreWebView2ExperimentalCookie **cookie);
        
        HRESULT ( STDMETHODCALLTYPE *CreateCookieWithCookie )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ ICoreWebView2ExperimentalCookie *cookieParam,
            /* [retval][out] */ ICoreWebView2ExperimentalCookie **cookie);
        
        HRESULT ( STDMETHODCALLTYPE *GetCookies )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ LPCWSTR uri,
            /* [in] */ ICoreWebView2ExperimentalGetCookiesCompletedHandler *handler);
        
        HRESULT ( STDMETHODCALLTYPE *AddOrUpdateCookie )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ ICoreWebView2ExperimentalCookie *cookie);
        
        HRESULT ( STDMETHODCALLTYPE *DeleteCookie )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ ICoreWebView2ExperimentalCookie *cookie);
        
        HRESULT ( STDMETHODCALLTYPE *DeleteCookies )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ LPCWSTR name,
            /* [in] */ LPCWSTR uri);
        
        HRESULT ( STDMETHODCALLTYPE *DeleteCookiesWithDomainAndPath )( 
            ICoreWebView2ExperimentalCookieManager * This,
            /* [in] */ LPCWSTR name,
            /* [in] */ LPCWSTR domain,
            /* [in] */ LPCWSTR path);
        
        HRESULT ( STDMETHODCALLTYPE *DeleteAllCookies )( 
            ICoreWebView2ExperimentalCookieManager * This);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCookieManagerVtbl;

    interface ICoreWebView2ExperimentalCookieManager
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCookieManagerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCookieManager_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCookieManager_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCookieManager_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCookieManager_CreateCookie(This,name,value,domain,path,cookie)	\
    ( (This)->lpVtbl -> CreateCookie(This,name,value,domain,path,cookie) ) 

#define ICoreWebView2ExperimentalCookieManager_CreateCookieWithCookie(This,cookieParam,cookie)	\
    ( (This)->lpVtbl -> CreateCookieWithCookie(This,cookieParam,cookie) ) 

#define ICoreWebView2ExperimentalCookieManager_GetCookies(This,uri,handler)	\
    ( (This)->lpVtbl -> GetCookies(This,uri,handler) ) 

#define ICoreWebView2ExperimentalCookieManager_AddOrUpdateCookie(This,cookie)	\
    ( (This)->lpVtbl -> AddOrUpdateCookie(This,cookie) ) 

#define ICoreWebView2ExperimentalCookieManager_DeleteCookie(This,cookie)	\
    ( (This)->lpVtbl -> DeleteCookie(This,cookie) ) 

#define ICoreWebView2ExperimentalCookieManager_DeleteCookies(This,name,uri)	\
    ( (This)->lpVtbl -> DeleteCookies(This,name,uri) ) 

#define ICoreWebView2ExperimentalCookieManager_DeleteCookiesWithDomainAndPath(This,name,domain,path)	\
    ( (This)->lpVtbl -> DeleteCookiesWithDomainAndPath(This,name,domain,path) ) 

#define ICoreWebView2ExperimentalCookieManager_DeleteAllCookies(This)	\
    ( (This)->lpVtbl -> DeleteAllCookies(This) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCookieManager_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("34b35ab6-3e59-4fc4-a723-0c04953e3e13")
    ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Invoke( 
            HRESULT errorCode,
            ICoreWebView2ExperimentalCompositionController *webView) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandlerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler * This);
        
        HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler * This,
            HRESULT errorCode,
            ICoreWebView2ExperimentalCompositionController *webView);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandlerVtbl;

    interface ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandlerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_Invoke(This,errorCode,webView)	\
    ( (This)->lpVtbl -> Invoke(This,errorCode,webView) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalDOMContentLoadedEventArgs_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalDOMContentLoadedEventArgs_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalDOMContentLoadedEventArgs */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalDOMContentLoadedEventArgs;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("F43B0D51-D537-4736-93AB-138529AFDE59")
    ICoreWebView2ExperimentalDOMContentLoadedEventArgs : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_NavigationId( 
            /* [retval][out] */ UINT64 *navigation_id) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalDOMContentLoadedEventArgsVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventArgs * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventArgs * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventArgs * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_NavigationId )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventArgs * This,
            /* [retval][out] */ UINT64 *navigation_id);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalDOMContentLoadedEventArgsVtbl;

    interface ICoreWebView2ExperimentalDOMContentLoadedEventArgs
    {
        CONST_VTBL struct ICoreWebView2ExperimentalDOMContentLoadedEventArgsVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalDOMContentLoadedEventArgs_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalDOMContentLoadedEventArgs_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalDOMContentLoadedEventArgs_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalDOMContentLoadedEventArgs_get_NavigationId(This,navigation_id)	\
    ( (This)->lpVtbl -> get_NavigationId(This,navigation_id) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalDOMContentLoadedEventArgs_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalDOMContentLoadedEventHandler_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalDOMContentLoadedEventHandler_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalDOMContentLoadedEventHandler */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalDOMContentLoadedEventHandler;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("18665829-2B7A-465A-A1EC-B66C9B740138")
    ICoreWebView2ExperimentalDOMContentLoadedEventHandler : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Invoke( 
            /* [in] */ ICoreWebView2 *sender,
            /* [in] */ ICoreWebView2ExperimentalDOMContentLoadedEventArgs *args) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalDOMContentLoadedEventHandlerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventHandler * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventHandler * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventHandler * This);
        
        HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ICoreWebView2ExperimentalDOMContentLoadedEventHandler * This,
            /* [in] */ ICoreWebView2 *sender,
            /* [in] */ ICoreWebView2ExperimentalDOMContentLoadedEventArgs *args);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalDOMContentLoadedEventHandlerVtbl;

    interface ICoreWebView2ExperimentalDOMContentLoadedEventHandler
    {
        CONST_VTBL struct ICoreWebView2ExperimentalDOMContentLoadedEventHandlerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalDOMContentLoadedEventHandler_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalDOMContentLoadedEventHandler_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalDOMContentLoadedEventHandler_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalDOMContentLoadedEventHandler_Invoke(This,sender,args)	\
    ( (This)->lpVtbl -> Invoke(This,sender,args) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalDOMContentLoadedEventHandler_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalEnvironmentInterop_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalEnvironmentInterop_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalEnvironmentInterop */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalEnvironmentInterop;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("79455D4F-D28D-4C3F-A713-13CA393BD2E4")
    ICoreWebView2ExperimentalEnvironmentInterop : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE GetProviderForHwnd( 
            /* [in] */ HWND hwnd,
            /* [retval][out] */ IUnknown **provider) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalEnvironmentInteropVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalEnvironmentInterop * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalEnvironmentInterop * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalEnvironmentInterop * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetProviderForHwnd )( 
            ICoreWebView2ExperimentalEnvironmentInterop * This,
            /* [in] */ HWND hwnd,
            /* [retval][out] */ IUnknown **provider);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalEnvironmentInteropVtbl;

    interface ICoreWebView2ExperimentalEnvironmentInterop
    {
        CONST_VTBL struct ICoreWebView2ExperimentalEnvironmentInteropVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalEnvironmentInterop_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalEnvironmentInterop_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalEnvironmentInterop_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalEnvironmentInterop_GetProviderForHwnd(This,hwnd,provider)	\
    ( (This)->lpVtbl -> GetProviderForHwnd(This,hwnd,provider) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalEnvironmentInterop_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalGetCookiesCompletedHandler_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalGetCookiesCompletedHandler_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalGetCookiesCompletedHandler */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalGetCookiesCompletedHandler;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("39B603EB-7AF5-4D22-8D33-77AD7576E795")
    ICoreWebView2ExperimentalGetCookiesCompletedHandler : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Invoke( 
            HRESULT result,
            ICoreWebView2ExperimentalCookieList *cookieList) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalGetCookiesCompletedHandlerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalGetCookiesCompletedHandler * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalGetCookiesCompletedHandler * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalGetCookiesCompletedHandler * This);
        
        HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ICoreWebView2ExperimentalGetCookiesCompletedHandler * This,
            HRESULT result,
            ICoreWebView2ExperimentalCookieList *cookieList);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalGetCookiesCompletedHandlerVtbl;

    interface ICoreWebView2ExperimentalGetCookiesCompletedHandler
    {
        CONST_VTBL struct ICoreWebView2ExperimentalGetCookiesCompletedHandlerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalGetCookiesCompletedHandler_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalGetCookiesCompletedHandler_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalGetCookiesCompletedHandler_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalGetCookiesCompletedHandler_Invoke(This,result,cookieList)	\
    ( (This)->lpVtbl -> Invoke(This,result,cookieList) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalGetCookiesCompletedHandler_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalPointerInfo_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalPointerInfo_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalPointerInfo */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalPointerInfo;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("4bb4e46d-7d78-47bd-bdd2-4b77288dc949")
    ICoreWebView2ExperimentalPointerInfo : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PointerKind( 
            /* [retval][out] */ DWORD *pointerKind) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PointerKind( 
            /* [in] */ DWORD pointerKind) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PointerId( 
            /* [retval][out] */ UINT32 *pointerId) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PointerId( 
            /* [in] */ UINT32 pointerId) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_FrameId( 
            /* [retval][out] */ UINT32 *frameId) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_FrameId( 
            /* [in] */ UINT32 frameId) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PointerFlags( 
            /* [retval][out] */ UINT32 *pointerFlags) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PointerFlags( 
            /* [in] */ UINT32 pointerFlags) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PointerDeviceRect( 
            /* [retval][out] */ RECT *pointerDeviceRect) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PointerDeviceRect( 
            /* [in] */ RECT pointerDeviceRect) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_DisplayRect( 
            /* [retval][out] */ RECT *displayRect) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_DisplayRect( 
            /* [in] */ RECT displayRect) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PixelLocation( 
            /* [retval][out] */ POINT *pixelLocation) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PixelLocation( 
            /* [in] */ POINT pixelLocation) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_HimetricLocation( 
            /* [retval][out] */ POINT *himetricLocation) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_HimetricLocation( 
            /* [in] */ POINT himetricLocation) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PixelLocationRaw( 
            /* [retval][out] */ POINT *pixelLocationRaw) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PixelLocationRaw( 
            /* [in] */ POINT pixelLocationRaw) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_HimetricLocationRaw( 
            /* [retval][out] */ POINT *himetricLocationRaw) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_HimetricLocationRaw( 
            /* [in] */ POINT himetricLocationRaw) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Time( 
            /* [retval][out] */ DWORD *time) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_Time( 
            /* [in] */ DWORD time) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_HistoryCount( 
            /* [retval][out] */ UINT32 *historyCount) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_HistoryCount( 
            /* [in] */ UINT32 historyCount) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_InputData( 
            /* [retval][out] */ INT32 *inputData) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_InputData( 
            /* [in] */ INT32 inputData) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_KeyStates( 
            /* [retval][out] */ DWORD *keyStates) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_KeyStates( 
            /* [in] */ DWORD keyStates) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PerformanceCount( 
            /* [retval][out] */ UINT64 *performanceCount) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PerformanceCount( 
            /* [in] */ UINT64 performanceCount) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_ButtonChangeKind( 
            /* [retval][out] */ INT32 *buttonChangeKind) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_ButtonChangeKind( 
            /* [in] */ INT32 buttonChangeKind) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PenFlags( 
            /* [retval][out] */ UINT32 *penFLags) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PenFlags( 
            /* [in] */ UINT32 penFLags) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PenMask( 
            /* [retval][out] */ UINT32 *penMask) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PenMask( 
            /* [in] */ UINT32 penMask) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PenPressure( 
            /* [retval][out] */ UINT32 *penPressure) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PenPressure( 
            /* [in] */ UINT32 penPressure) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PenRotation( 
            /* [retval][out] */ UINT32 *penRotation) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PenRotation( 
            /* [in] */ UINT32 penRotation) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PenTiltX( 
            /* [retval][out] */ INT32 *penTiltX) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PenTiltX( 
            /* [in] */ INT32 penTiltX) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_PenTiltY( 
            /* [retval][out] */ INT32 *penTiltY) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_PenTiltY( 
            /* [in] */ INT32 penTiltY) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_TouchFlags( 
            /* [retval][out] */ UINT32 *touchFlags) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_TouchFlags( 
            /* [in] */ UINT32 touchFlags) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_TouchMask( 
            /* [retval][out] */ UINT32 *touchMask) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_TouchMask( 
            /* [in] */ UINT32 touchMask) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_TouchContact( 
            /* [retval][out] */ RECT *touchContact) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_TouchContact( 
            /* [in] */ RECT touchContact) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_TouchContactRaw( 
            /* [retval][out] */ RECT *touchContactRaw) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_TouchContactRaw( 
            /* [in] */ RECT touchContactRaw) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_TouchOrientation( 
            /* [retval][out] */ UINT32 *touchOrientation) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_TouchOrientation( 
            /* [in] */ UINT32 touchOrientation) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_TouchPressure( 
            /* [retval][out] */ UINT32 *touchPressure) = 0;
        
        virtual /* [propput] */ HRESULT STDMETHODCALLTYPE put_TouchPressure( 
            /* [in] */ UINT32 touchPressure) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalPointerInfoVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalPointerInfo * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalPointerInfo * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PointerKind )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ DWORD *pointerKind);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PointerKind )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ DWORD pointerKind);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PointerId )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *pointerId);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PointerId )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 pointerId);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_FrameId )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *frameId);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_FrameId )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 frameId);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PointerFlags )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *pointerFlags);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PointerFlags )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 pointerFlags);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PointerDeviceRect )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ RECT *pointerDeviceRect);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PointerDeviceRect )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ RECT pointerDeviceRect);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_DisplayRect )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ RECT *displayRect);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_DisplayRect )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ RECT displayRect);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PixelLocation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ POINT *pixelLocation);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PixelLocation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ POINT pixelLocation);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_HimetricLocation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ POINT *himetricLocation);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_HimetricLocation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ POINT himetricLocation);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PixelLocationRaw )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ POINT *pixelLocationRaw);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PixelLocationRaw )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ POINT pixelLocationRaw);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_HimetricLocationRaw )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ POINT *himetricLocationRaw);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_HimetricLocationRaw )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ POINT himetricLocationRaw);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Time )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ DWORD *time);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_Time )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ DWORD time);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_HistoryCount )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *historyCount);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_HistoryCount )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 historyCount);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_InputData )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ INT32 *inputData);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_InputData )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ INT32 inputData);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_KeyStates )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ DWORD *keyStates);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_KeyStates )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ DWORD keyStates);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PerformanceCount )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT64 *performanceCount);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PerformanceCount )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT64 performanceCount);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_ButtonChangeKind )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ INT32 *buttonChangeKind);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_ButtonChangeKind )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ INT32 buttonChangeKind);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PenFlags )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *penFLags);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PenFlags )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 penFLags);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PenMask )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *penMask);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PenMask )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 penMask);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PenPressure )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *penPressure);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PenPressure )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 penPressure);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PenRotation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *penRotation);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PenRotation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 penRotation);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PenTiltX )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ INT32 *penTiltX);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PenTiltX )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ INT32 penTiltX);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_PenTiltY )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ INT32 *penTiltY);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_PenTiltY )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ INT32 penTiltY);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_TouchFlags )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *touchFlags);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_TouchFlags )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 touchFlags);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_TouchMask )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *touchMask);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_TouchMask )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 touchMask);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_TouchContact )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ RECT *touchContact);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_TouchContact )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ RECT touchContact);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_TouchContactRaw )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ RECT *touchContactRaw);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_TouchContactRaw )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ RECT touchContactRaw);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_TouchOrientation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *touchOrientation);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_TouchOrientation )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 touchOrientation);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_TouchPressure )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [retval][out] */ UINT32 *touchPressure);
        
        /* [propput] */ HRESULT ( STDMETHODCALLTYPE *put_TouchPressure )( 
            ICoreWebView2ExperimentalPointerInfo * This,
            /* [in] */ UINT32 touchPressure);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalPointerInfoVtbl;

    interface ICoreWebView2ExperimentalPointerInfo
    {
        CONST_VTBL struct ICoreWebView2ExperimentalPointerInfoVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalPointerInfo_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalPointerInfo_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalPointerInfo_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalPointerInfo_get_PointerKind(This,pointerKind)	\
    ( (This)->lpVtbl -> get_PointerKind(This,pointerKind) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PointerKind(This,pointerKind)	\
    ( (This)->lpVtbl -> put_PointerKind(This,pointerKind) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PointerId(This,pointerId)	\
    ( (This)->lpVtbl -> get_PointerId(This,pointerId) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PointerId(This,pointerId)	\
    ( (This)->lpVtbl -> put_PointerId(This,pointerId) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_FrameId(This,frameId)	\
    ( (This)->lpVtbl -> get_FrameId(This,frameId) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_FrameId(This,frameId)	\
    ( (This)->lpVtbl -> put_FrameId(This,frameId) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PointerFlags(This,pointerFlags)	\
    ( (This)->lpVtbl -> get_PointerFlags(This,pointerFlags) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PointerFlags(This,pointerFlags)	\
    ( (This)->lpVtbl -> put_PointerFlags(This,pointerFlags) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PointerDeviceRect(This,pointerDeviceRect)	\
    ( (This)->lpVtbl -> get_PointerDeviceRect(This,pointerDeviceRect) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PointerDeviceRect(This,pointerDeviceRect)	\
    ( (This)->lpVtbl -> put_PointerDeviceRect(This,pointerDeviceRect) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_DisplayRect(This,displayRect)	\
    ( (This)->lpVtbl -> get_DisplayRect(This,displayRect) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_DisplayRect(This,displayRect)	\
    ( (This)->lpVtbl -> put_DisplayRect(This,displayRect) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PixelLocation(This,pixelLocation)	\
    ( (This)->lpVtbl -> get_PixelLocation(This,pixelLocation) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PixelLocation(This,pixelLocation)	\
    ( (This)->lpVtbl -> put_PixelLocation(This,pixelLocation) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_HimetricLocation(This,himetricLocation)	\
    ( (This)->lpVtbl -> get_HimetricLocation(This,himetricLocation) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_HimetricLocation(This,himetricLocation)	\
    ( (This)->lpVtbl -> put_HimetricLocation(This,himetricLocation) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PixelLocationRaw(This,pixelLocationRaw)	\
    ( (This)->lpVtbl -> get_PixelLocationRaw(This,pixelLocationRaw) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PixelLocationRaw(This,pixelLocationRaw)	\
    ( (This)->lpVtbl -> put_PixelLocationRaw(This,pixelLocationRaw) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_HimetricLocationRaw(This,himetricLocationRaw)	\
    ( (This)->lpVtbl -> get_HimetricLocationRaw(This,himetricLocationRaw) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_HimetricLocationRaw(This,himetricLocationRaw)	\
    ( (This)->lpVtbl -> put_HimetricLocationRaw(This,himetricLocationRaw) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_Time(This,time)	\
    ( (This)->lpVtbl -> get_Time(This,time) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_Time(This,time)	\
    ( (This)->lpVtbl -> put_Time(This,time) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_HistoryCount(This,historyCount)	\
    ( (This)->lpVtbl -> get_HistoryCount(This,historyCount) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_HistoryCount(This,historyCount)	\
    ( (This)->lpVtbl -> put_HistoryCount(This,historyCount) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_InputData(This,inputData)	\
    ( (This)->lpVtbl -> get_InputData(This,inputData) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_InputData(This,inputData)	\
    ( (This)->lpVtbl -> put_InputData(This,inputData) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_KeyStates(This,keyStates)	\
    ( (This)->lpVtbl -> get_KeyStates(This,keyStates) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_KeyStates(This,keyStates)	\
    ( (This)->lpVtbl -> put_KeyStates(This,keyStates) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PerformanceCount(This,performanceCount)	\
    ( (This)->lpVtbl -> get_PerformanceCount(This,performanceCount) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PerformanceCount(This,performanceCount)	\
    ( (This)->lpVtbl -> put_PerformanceCount(This,performanceCount) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_ButtonChangeKind(This,buttonChangeKind)	\
    ( (This)->lpVtbl -> get_ButtonChangeKind(This,buttonChangeKind) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_ButtonChangeKind(This,buttonChangeKind)	\
    ( (This)->lpVtbl -> put_ButtonChangeKind(This,buttonChangeKind) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PenFlags(This,penFLags)	\
    ( (This)->lpVtbl -> get_PenFlags(This,penFLags) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PenFlags(This,penFLags)	\
    ( (This)->lpVtbl -> put_PenFlags(This,penFLags) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PenMask(This,penMask)	\
    ( (This)->lpVtbl -> get_PenMask(This,penMask) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PenMask(This,penMask)	\
    ( (This)->lpVtbl -> put_PenMask(This,penMask) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PenPressure(This,penPressure)	\
    ( (This)->lpVtbl -> get_PenPressure(This,penPressure) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PenPressure(This,penPressure)	\
    ( (This)->lpVtbl -> put_PenPressure(This,penPressure) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PenRotation(This,penRotation)	\
    ( (This)->lpVtbl -> get_PenRotation(This,penRotation) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PenRotation(This,penRotation)	\
    ( (This)->lpVtbl -> put_PenRotation(This,penRotation) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PenTiltX(This,penTiltX)	\
    ( (This)->lpVtbl -> get_PenTiltX(This,penTiltX) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PenTiltX(This,penTiltX)	\
    ( (This)->lpVtbl -> put_PenTiltX(This,penTiltX) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_PenTiltY(This,penTiltY)	\
    ( (This)->lpVtbl -> get_PenTiltY(This,penTiltY) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_PenTiltY(This,penTiltY)	\
    ( (This)->lpVtbl -> put_PenTiltY(This,penTiltY) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_TouchFlags(This,touchFlags)	\
    ( (This)->lpVtbl -> get_TouchFlags(This,touchFlags) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_TouchFlags(This,touchFlags)	\
    ( (This)->lpVtbl -> put_TouchFlags(This,touchFlags) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_TouchMask(This,touchMask)	\
    ( (This)->lpVtbl -> get_TouchMask(This,touchMask) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_TouchMask(This,touchMask)	\
    ( (This)->lpVtbl -> put_TouchMask(This,touchMask) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_TouchContact(This,touchContact)	\
    ( (This)->lpVtbl -> get_TouchContact(This,touchContact) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_TouchContact(This,touchContact)	\
    ( (This)->lpVtbl -> put_TouchContact(This,touchContact) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_TouchContactRaw(This,touchContactRaw)	\
    ( (This)->lpVtbl -> get_TouchContactRaw(This,touchContactRaw) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_TouchContactRaw(This,touchContactRaw)	\
    ( (This)->lpVtbl -> put_TouchContactRaw(This,touchContactRaw) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_TouchOrientation(This,touchOrientation)	\
    ( (This)->lpVtbl -> get_TouchOrientation(This,touchOrientation) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_TouchOrientation(This,touchOrientation)	\
    ( (This)->lpVtbl -> put_TouchOrientation(This,touchOrientation) ) 

#define ICoreWebView2ExperimentalPointerInfo_get_TouchPressure(This,touchPressure)	\
    ( (This)->lpVtbl -> get_TouchPressure(This,touchPressure) ) 

#define ICoreWebView2ExperimentalPointerInfo_put_TouchPressure(This,touchPressure)	\
    ( (This)->lpVtbl -> put_TouchPressure(This,touchPressure) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalPointerInfo_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalCursorChangedEventHandler_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalCursorChangedEventHandler_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalCursorChangedEventHandler */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalCursorChangedEventHandler;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("9da43ccc-26e1-4dad-b56c-d8961c94c571")
    ICoreWebView2ExperimentalCursorChangedEventHandler : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Invoke( 
            /* [in] */ ICoreWebView2ExperimentalCompositionController *sender,
            /* [in] */ IUnknown *args) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalCursorChangedEventHandlerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalCursorChangedEventHandler * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalCursorChangedEventHandler * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalCursorChangedEventHandler * This);
        
        HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ICoreWebView2ExperimentalCursorChangedEventHandler * This,
            /* [in] */ ICoreWebView2ExperimentalCompositionController *sender,
            /* [in] */ IUnknown *args);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalCursorChangedEventHandlerVtbl;

    interface ICoreWebView2ExperimentalCursorChangedEventHandler
    {
        CONST_VTBL struct ICoreWebView2ExperimentalCursorChangedEventHandlerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalCursorChangedEventHandler_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalCursorChangedEventHandler_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalCursorChangedEventHandler_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalCursorChangedEventHandler_Invoke(This,sender,args)	\
    ( (This)->lpVtbl -> Invoke(This,sender,args) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalCursorChangedEventHandler_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("b32bbf6b-fa14-45ad-b351-ae7bce5b5260")
    ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Invoke( 
            /* [in] */ ICoreWebView2Experimental *sender,
            /* [in] */ ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs *args) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandlerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler * This);
        
        HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler * This,
            /* [in] */ ICoreWebView2Experimental *sender,
            /* [in] */ ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs *args);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandlerVtbl;

    interface ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler
    {
        CONST_VTBL struct ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandlerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_Invoke(This,sender,args)	\
    ( (This)->lpVtbl -> Invoke(This,sender,args) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("89f702e9-4841-4911-a188-9f4ff3dcb2be")
    ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Request( 
            /* [retval][out] */ ICoreWebView2WebResourceRequest **request) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Response( 
            /* [retval][out] */ ICoreWebView2ExperimentalWebResourceResponseView **response) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgsVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Request )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs * This,
            /* [retval][out] */ ICoreWebView2WebResourceRequest **request);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Response )( 
            ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs * This,
            /* [retval][out] */ ICoreWebView2ExperimentalWebResourceResponseView **response);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgsVtbl;

    interface ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs
    {
        CONST_VTBL struct ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgsVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_get_Request(This,request)	\
    ( (This)->lpVtbl -> get_Request(This,request) ) 

#define ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_get_Response(This,response)	\
    ( (This)->lpVtbl -> get_Response(This,response) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseReceivedEventArgs_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseView_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseView_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalWebResourceResponseView */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalWebResourceResponseView;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("82ae4336-71d5-464a-a031-dce809978909")
    ICoreWebView2ExperimentalWebResourceResponseView : public IUnknown
    {
    public:
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Headers( 
            /* [retval][out] */ ICoreWebView2HttpResponseHeaders **headers) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_StatusCode( 
            /* [retval][out] */ int *statusCode) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_ReasonPhrase( 
            /* [retval][out] */ LPWSTR *reasonPhrase) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE GetContent( 
            /* [in] */ ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler *handler) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalWebResourceResponseViewVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Headers )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This,
            /* [retval][out] */ ICoreWebView2HttpResponseHeaders **headers);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_StatusCode )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This,
            /* [retval][out] */ int *statusCode);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_ReasonPhrase )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This,
            /* [retval][out] */ LPWSTR *reasonPhrase);
        
        HRESULT ( STDMETHODCALLTYPE *GetContent )( 
            ICoreWebView2ExperimentalWebResourceResponseView * This,
            /* [in] */ ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler *handler);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalWebResourceResponseViewVtbl;

    interface ICoreWebView2ExperimentalWebResourceResponseView
    {
        CONST_VTBL struct ICoreWebView2ExperimentalWebResourceResponseViewVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalWebResourceResponseView_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalWebResourceResponseView_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalWebResourceResponseView_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalWebResourceResponseView_get_Headers(This,headers)	\
    ( (This)->lpVtbl -> get_Headers(This,headers) ) 

#define ICoreWebView2ExperimentalWebResourceResponseView_get_StatusCode(This,statusCode)	\
    ( (This)->lpVtbl -> get_StatusCode(This,statusCode) ) 

#define ICoreWebView2ExperimentalWebResourceResponseView_get_ReasonPhrase(This,reasonPhrase)	\
    ( (This)->lpVtbl -> get_ReasonPhrase(This,reasonPhrase) ) 

#define ICoreWebView2ExperimentalWebResourceResponseView_GetContent(This,handler)	\
    ( (This)->lpVtbl -> GetContent(This,handler) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseView_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("d9a1b87f-1438-4e75-83b1-c1c5801ecad5")
    ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Invoke( 
            /* [in] */ HRESULT errorCode,
            /* [in] */ IStream *content) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandlerVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler * This);
        
        HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler * This,
            /* [in] */ HRESULT errorCode,
            /* [in] */ IStream *content);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandlerVtbl;

    interface ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler
    {
        CONST_VTBL struct ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandlerVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_Invoke(This,errorCode,content)	\
    ( (This)->lpVtbl -> Invoke(This,errorCode,content) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalWebResourceResponseViewGetContentCompletedHandler_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2Experimental_INTERFACE_DEFINED__
#define __ICoreWebView2Experimental_INTERFACE_DEFINED__

/* interface ICoreWebView2Experimental */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2Experimental;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("31F05BAC-FFBB-4071-9355-7E57E3F18E50")
    ICoreWebView2Experimental : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE add_WebResourceResponseReceived( 
            /* [in] */ ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler *eventHandler,
            /* [out] */ EventRegistrationToken *token) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE remove_WebResourceResponseReceived( 
            /* [in] */ EventRegistrationToken token) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE NavigateWithWebResourceRequest( 
            /* [in] */ ICoreWebView2WebResourceRequest *request) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_CookieManager( 
            /* [retval][out] */ ICoreWebView2ExperimentalCookieManager **cookieManager) = 0;
        
        virtual /* [propget] */ HRESULT STDMETHODCALLTYPE get_Environment( 
            /* [retval][out] */ ICoreWebView2Environment **environment) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE add_DOMContentLoaded( 
            /* [in] */ ICoreWebView2ExperimentalDOMContentLoadedEventHandler *eventHandler,
            /* [out] */ EventRegistrationToken *token) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE remove_DOMContentLoaded( 
            /* [in] */ EventRegistrationToken token) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2Experimental * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2Experimental * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2Experimental * This);
        
        HRESULT ( STDMETHODCALLTYPE *add_WebResourceResponseReceived )( 
            ICoreWebView2Experimental * This,
            /* [in] */ ICoreWebView2ExperimentalWebResourceResponseReceivedEventHandler *eventHandler,
            /* [out] */ EventRegistrationToken *token);
        
        HRESULT ( STDMETHODCALLTYPE *remove_WebResourceResponseReceived )( 
            ICoreWebView2Experimental * This,
            /* [in] */ EventRegistrationToken token);
        
        HRESULT ( STDMETHODCALLTYPE *NavigateWithWebResourceRequest )( 
            ICoreWebView2Experimental * This,
            /* [in] */ ICoreWebView2WebResourceRequest *request);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_CookieManager )( 
            ICoreWebView2Experimental * This,
            /* [retval][out] */ ICoreWebView2ExperimentalCookieManager **cookieManager);
        
        /* [propget] */ HRESULT ( STDMETHODCALLTYPE *get_Environment )( 
            ICoreWebView2Experimental * This,
            /* [retval][out] */ ICoreWebView2Environment **environment);
        
        HRESULT ( STDMETHODCALLTYPE *add_DOMContentLoaded )( 
            ICoreWebView2Experimental * This,
            /* [in] */ ICoreWebView2ExperimentalDOMContentLoadedEventHandler *eventHandler,
            /* [out] */ EventRegistrationToken *token);
        
        HRESULT ( STDMETHODCALLTYPE *remove_DOMContentLoaded )( 
            ICoreWebView2Experimental * This,
            /* [in] */ EventRegistrationToken token);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalVtbl;

    interface ICoreWebView2Experimental
    {
        CONST_VTBL struct ICoreWebView2ExperimentalVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2Experimental_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2Experimental_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2Experimental_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2Experimental_add_WebResourceResponseReceived(This,eventHandler,token)	\
    ( (This)->lpVtbl -> add_WebResourceResponseReceived(This,eventHandler,token) ) 

#define ICoreWebView2Experimental_remove_WebResourceResponseReceived(This,token)	\
    ( (This)->lpVtbl -> remove_WebResourceResponseReceived(This,token) ) 

#define ICoreWebView2Experimental_NavigateWithWebResourceRequest(This,request)	\
    ( (This)->lpVtbl -> NavigateWithWebResourceRequest(This,request) ) 

#define ICoreWebView2Experimental_get_CookieManager(This,cookieManager)	\
    ( (This)->lpVtbl -> get_CookieManager(This,cookieManager) ) 

#define ICoreWebView2Experimental_get_Environment(This,environment)	\
    ( (This)->lpVtbl -> get_Environment(This,environment) ) 

#define ICoreWebView2Experimental_add_DOMContentLoaded(This,eventHandler,token)	\
    ( (This)->lpVtbl -> add_DOMContentLoaded(This,eventHandler,token) ) 

#define ICoreWebView2Experimental_remove_DOMContentLoaded(This,token)	\
    ( (This)->lpVtbl -> remove_DOMContentLoaded(This,token) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2Experimental_INTERFACE_DEFINED__ */


#ifndef __ICoreWebView2ExperimentalEnvironment_INTERFACE_DEFINED__
#define __ICoreWebView2ExperimentalEnvironment_INTERFACE_DEFINED__

/* interface ICoreWebView2ExperimentalEnvironment */
/* [unique][object][uuid] */ 


EXTERN_C const IID IID_ICoreWebView2ExperimentalEnvironment;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("427a8887-1ab4-4017-ae6e-c6e6eb16c664")
    ICoreWebView2ExperimentalEnvironment : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE CreateCoreWebView2CompositionController( 
            HWND parentWindow,
            ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler *handler) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE CreateCoreWebView2PointerInfo( 
            /* [retval][out] */ ICoreWebView2ExperimentalPointerInfo **pointerInfo) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE GetProviderForHwnd( 
            /* [in] */ HWND hwnd,
            /* [retval][out] */ IUnknown **provider) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE CreateWebResourceRequest( 
            /* [in] */ LPCWSTR uri,
            /* [in] */ LPCWSTR method,
            /* [in] */ IStream *postData,
            /* [in] */ LPCWSTR headers,
            /* [retval][out] */ ICoreWebView2WebResourceRequest **request) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct ICoreWebView2ExperimentalEnvironmentVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            ICoreWebView2ExperimentalEnvironment * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            ICoreWebView2ExperimentalEnvironment * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            ICoreWebView2ExperimentalEnvironment * This);
        
        HRESULT ( STDMETHODCALLTYPE *CreateCoreWebView2CompositionController )( 
            ICoreWebView2ExperimentalEnvironment * This,
            HWND parentWindow,
            ICoreWebView2ExperimentalCreateCoreWebView2CompositionControllerCompletedHandler *handler);
        
        HRESULT ( STDMETHODCALLTYPE *CreateCoreWebView2PointerInfo )( 
            ICoreWebView2ExperimentalEnvironment * This,
            /* [retval][out] */ ICoreWebView2ExperimentalPointerInfo **pointerInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetProviderForHwnd )( 
            ICoreWebView2ExperimentalEnvironment * This,
            /* [in] */ HWND hwnd,
            /* [retval][out] */ IUnknown **provider);
        
        HRESULT ( STDMETHODCALLTYPE *CreateWebResourceRequest )( 
            ICoreWebView2ExperimentalEnvironment * This,
            /* [in] */ LPCWSTR uri,
            /* [in] */ LPCWSTR method,
            /* [in] */ IStream *postData,
            /* [in] */ LPCWSTR headers,
            /* [retval][out] */ ICoreWebView2WebResourceRequest **request);
        
        END_INTERFACE
    } ICoreWebView2ExperimentalEnvironmentVtbl;

    interface ICoreWebView2ExperimentalEnvironment
    {
        CONST_VTBL struct ICoreWebView2ExperimentalEnvironmentVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define ICoreWebView2ExperimentalEnvironment_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define ICoreWebView2ExperimentalEnvironment_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define ICoreWebView2ExperimentalEnvironment_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define ICoreWebView2ExperimentalEnvironment_CreateCoreWebView2CompositionController(This,parentWindow,handler)	\
    ( (This)->lpVtbl -> CreateCoreWebView2CompositionController(This,parentWindow,handler) ) 

#define ICoreWebView2ExperimentalEnvironment_CreateCoreWebView2PointerInfo(This,pointerInfo)	\
    ( (This)->lpVtbl -> CreateCoreWebView2PointerInfo(This,pointerInfo) ) 

#define ICoreWebView2ExperimentalEnvironment_GetProviderForHwnd(This,hwnd,provider)	\
    ( (This)->lpVtbl -> GetProviderForHwnd(This,hwnd,provider) ) 

#define ICoreWebView2ExperimentalEnvironment_CreateWebResourceRequest(This,uri,method,postData,headers,request)	\
    ( (This)->lpVtbl -> CreateWebResourceRequest(This,uri,method,postData,headers,request) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __ICoreWebView2ExperimentalEnvironment_INTERFACE_DEFINED__ */

#endif /* __WebView2Experimental_LIBRARY_DEFINED__ */

/* Additional Prototypes for ALL interfaces */

/* end of Additional Prototypes */

#ifdef __cplusplus
}
#endif

#endif


