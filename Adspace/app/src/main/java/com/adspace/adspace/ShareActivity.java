package com.adspace.adspace;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.share.ShareApi;
import com.facebook.share.model.SharePhoto;
import com.facebook.share.model.SharePhotoContent;
import com.facebook.FacebookException;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Microsoft on 1. 11. 2015.
 */
public class ShareActivity extends AppCompatActivity {

    private CallbackManager callbackManager;
    private LoginManager loginManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_share);

            FacebookSdk.sdkInitialize(getApplicationContext());

            callbackManager = CallbackManager.Factory.create();

            List<String> permissionNeeds = Arrays.asList("publish_actions");

            //this loginManager helps you eliminate adding a LoginButton to your UI
            LoginManager manager = LoginManager.getInstance();

            manager.logInWithPublishPermissions(this, permissionNeeds);

            manager.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
                @Override
                public void onSuccess(LoginResult loginResult) {
                    sharePhotoToFacebook();

                }

                @Override
                public void onCancel() {
                    System.out.println("onCancel");
                }

                @Override
                public void onError(FacebookException exception) {
                    System.out.println("onError");
                }
            });
        }

    private void sharePhotoToFacebook() {
        Bitmap image = (Bitmap) getIntent().getParcelableExtra("picture");
        SharePhoto photo = new SharePhoto.Builder()
                .setBitmap(image)
                .setCaption("Adspace is awesome!!!")
                .build();

        SharePhotoContent content = new SharePhotoContent.Builder()
                .addPhoto(photo)
                .build();

        ShareApi.share(content, null);

    }

    @Override
    protected void onActivityResult(int requestCode, int responseCode, Intent data) {
        super.onActivityResult(requestCode, responseCode, data);
        callbackManager.onActivityResult(requestCode, responseCode, data);
    }


}

