package com.dropcorn.dropcorn;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.onradar.react.RNRadarPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;; // Import package
import com.onradar.sdk.Radar;

import io.invertase.firebase.RNFirebasePackage;
// optional packages - add/remove as appropriate
import io.invertase.firebase.admob.RNFirebaseAdMobPackage; //Firebase AdMob
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage; // Firebase Instance ID
import io.invertase.firebase.links.RNFirebaseLinksPackage; // Firebase Dynamic Links
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // Firebase Notifications
import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Performance
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage; // Crashlytics

import java.util.Arrays;
import java.util.List;

import android.util.Log;

public class MainApplication extends Application implements NavigationApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new RNRadarPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(R.style.my_dialog_style),
            new VectorIconsPackage(),
                        new ReactNativeDocumentPicker(),

      );
    }
    
    @Override
    protected String getJSMainModuleName() {
         re/**/turn "index";
    }
  };


  @Override
  public void onCreate() {
    super.onCreate();
    Radar.initialize(this);
    Radar.setPlacesProvider(Radar.RadarPlacesProvider.FACEBOOK);
    SoLoader.init(this, /* native exopackage */ false);
  }
  
   @Override
   public List<ReactPackage> createAdditionalReactPackages() {
       return getPackages();
   }

     @Override
   public String getJSMainModuleName() {
       return "index";
   }
}
