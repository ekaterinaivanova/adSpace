package com.adspace.adspace;

import android.content.Intent;
import android.graphics.Bitmap;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;


import com.facebook.AccessToken;
import com.facebook.AccessTokenTracker;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.Profile;
import com.facebook.ProfileTracker;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.facebook.share.ShareApi;
import com.facebook.share.model.SharePhoto;
import com.facebook.share.model.SharePhotoContent;
import com.facebook.share.widget.ShareButton;
import com.facebook.share.widget.ShareDialog;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity{

    //GLOBALNE SPREMENLJIVKE
    private TextView textViewLoginWelcome;
    Bitmap thumbnail;
    Button btnTakPhoto; //za zajem fotografije
    ImageView imageViewposnetaFotografija; //thumbnail prikaz
    private static final int CAM_REQUEST = 1313;
    private CallbackManager mCallbackManager;
    List<String> permissionNeeds = Arrays.asList("publish_actions");
    ShareDialog shareDialog;

    private AccessTokenTracker mTokenTracker;
    private ProfileTracker mProfileTracker;

    //FACEBOOK FUNKCIJE
    private FacebookCallback<LoginResult> mCallback = new FacebookCallback<LoginResult>() { //callback manager za Login
        @Override
        public void onSuccess(LoginResult loginResult) {
            AccessToken acessToken = loginResult.getAccessToken();
            Profile profile = Profile.getCurrentProfile();
            displayWelcomeMassage(profile);
        }

        @Override
        public void onCancel() {
        }

        @Override
        public void onError(FacebookException e) {
        }
    };



    private void sharePhotoToFacebook(Bitmap image){ //funkcija za deljenje fotografij
        SharePhoto photo = new SharePhoto.Builder()
                .setBitmap(image)
                .setCaption("Adspace test")
                .build();

        SharePhotoContent content = new SharePhotoContent.Builder()
                .addPhoto(photo)
                .build();

        ShareApi.share(content, null);
    }
//----------------------------------------------------------------------------------------------


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        setContentView(R.layout.activity_main);

        mTokenTracker = new AccessTokenTracker() { //upostevanje sprememb v fb racunu
            @Override
            protected void onCurrentAccessTokenChanged(AccessToken oldToken, AccessToken newToken) {
            }
        };
        mProfileTracker = new ProfileTracker() {
            @Override
            protected void onCurrentProfileChanged(Profile oldProfile, Profile newProfile) {
            }
        };
        mTokenTracker.startTracking();
        mProfileTracker.startTracking();




        Button shareButton =(Button) findViewById(R.id.buttonShare);
        shareButton.setOnClickListener(new buttonShareOnClick());


        textViewLoginWelcome = (TextView) findViewById(R.id.textView); //Pozdrav pri vpisu
        mCallbackManager = CallbackManager.Factory.create();

        LoginButton loginButton = (LoginButton) findViewById(R.id.login_button);
        loginButton.setReadPermissions("user_friends");
        //loginButton.setPublishPermissions("publish_actions");
        loginButton.registerCallback(mCallbackManager, mCallback);

        btnTakPhoto = (Button) findViewById(R.id.buttonTakePicture); //gumb za zajem fotografije
        imageViewposnetaFotografija = (ImageView) findViewById(R.id.imageView);  //prostor za prikaz fotografije

        btnTakPhoto.setOnClickListener(new btnTakePhotoClicker());
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == CAM_REQUEST && resultCode == RESULT_OK){ //rezultat za kamero
            thumbnail = (Bitmap) data.getExtras().get("data");
            imageViewposnetaFotografija.setImageBitmap(thumbnail);
        }

        mCallbackManager.onActivityResult(requestCode, resultCode, data); //rezultat za FB login
    }









    class btnTakePhotoClicker implements Button.OnClickListener{
        @Override
        public void onClick(View v) {
            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            startActivityForResult(cameraIntent, CAM_REQUEST);
        }
    }

    class buttonShareOnClick implements Button.OnClickListener {
        @Override
        public void onClick(View view) {
            System.out.println("Tu sem");
            if (thumbnail != null){
                Intent intent = new Intent(getApplicationContext(), ShareActivity.class);
                intent.putExtra("picture", thumbnail );
                startActivity(intent);
            }
        }
    }


    @Override
    protected void onStop() {
        super.onStop();
        mTokenTracker.stopTracking();
        mProfileTracker.stopTracking();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }


    public void displayWelcomeMassage(Profile profile){ //ob vpisu se poklice ta metoda za prikaz imena
    if(profile!= null){
        textViewLoginWelcome.setText("Welcome to adspace " + profile.getFirstName());
    }
    }

    @Override
    protected void onResume() {
        super.onResume();
        imageViewposnetaFotografija.setImageBitmap(thumbnail);
        Profile profile = Profile.getCurrentProfile(); //Prikaz welcome massage
        displayWelcomeMassage(profile);

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }


}
