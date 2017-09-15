package com.laniuslab.studioteam.formulae;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.IdRes;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.laniuslab.studioteam.formulae.Fragment.DashboardFragment;
import com.laniuslab.studioteam.formulae.Fragment.DriversFragment;
import com.laniuslab.studioteam.formulae.Fragment.MediaFragment;
import com.laniuslab.studioteam.formulae.Fragment.ProfileFragment;
import com.laniuslab.studioteam.formulae.R;
import com.laniuslab.studioteam.formulae.utils.Constants;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabSelectListener;

public class NewHomeActivity extends AppCompatActivity {
    public int backButtonCount;
    private ProgressDialog progressDialog;
    public String photoUrl,fixmail, circuit_photoUrl, tittle_photoUrl;
    private FirebaseAuth firebaseAuth;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_home);
        progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("Loading...");
        progressDialog.show();
        firebaseAuth = FirebaseAuth.getInstance();
        if(FirebaseAuth.getInstance().getCurrentUser() == null){
            FirebaseDatabase database = FirebaseDatabase.getInstance();
            DatabaseReference lastestReference = database.getReference().child(com.laniuslab.studioteam.formulae.utils.Constants.LASTEST);
            lastestReference.addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    circuit_photoUrl = dataSnapshot.child(Constants.CIRCUITPHOTOURL).getValue(String.class);
                    tittle_photoUrl = dataSnapshot.child(Constants.TITTLEPHOTOURL).getValue(String.class);
                    FragmentTransaction tx = getSupportFragmentManager().beginTransaction();
                    DashboardFragment dashboardFragment = new DashboardFragment();
                    Bundle args = new Bundle();
                    args.putString("tittle_photoUrl",tittle_photoUrl);
                    args.putString("circuit_photoUrl",circuit_photoUrl);
                    dashboardFragment.setArguments(args);
                    tx.replace(R.id.contentContainer, dashboardFragment);
                    tx.commit();
                    progressDialog.dismiss();
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {

                }
            });
        }else{
            FirebaseUser user = firebaseAuth.getCurrentUser();
            String useremail = user.getEmail();
            String fix_email = useremail.replace(".",",");
            FirebaseDatabase database = FirebaseDatabase.getInstance();
            DatabaseReference userReference = database.getReference().child(Constants.USER).child(fix_email);

            userReference.child(Constants.PHOTOURL).addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    if(dataSnapshot.exists()){
                        photoUrl = dataSnapshot.getValue(String.class);
                        progressDialog.dismiss();
                    }else{
                        progressDialog.dismiss();
                    }
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {

                }
            });
        }


        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                if (tabId == R.id.tab_recent) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                    getFragmentManager().popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
                    DashboardFragment dashboardFragment = new DashboardFragment();
                    Bundle args = new Bundle();
                    args.putString("tittle_photoUrl",tittle_photoUrl);
                    args.putString("circuit_photoUrl",circuit_photoUrl);
                    dashboardFragment.setArguments(args);
                    getSupportFragmentManager().beginTransaction().replace(R.id.contentContainer,dashboardFragment).commit();
                }
                if (tabId == R.id.tab_race) {
                    getFragmentManager().popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
                }
                if (tabId == R.id.tab_driver) {
                    getFragmentManager().popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
                    DriversFragment driversFragment = new DriversFragment();
                    getSupportFragmentManager().beginTransaction().replace(R.id.contentContainer,driversFragment).commit();
                }
                if (tabId == R.id.tab_video) {
                    getFragmentManager().popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
                    MediaFragment mediaFragment = new MediaFragment();
                    getSupportFragmentManager().beginTransaction().replace(R.id.contentContainer,mediaFragment).commit();

                }
                if (tabId == R.id.tab_profile) {
                    getFragmentManager().popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
                    if(FirebaseAuth.getInstance().getCurrentUser() == null){
                        Intent i = new Intent(getApplicationContext(), AuthenticationActivity.class);
                        startActivity(i);
                    }else{
                        ProfileFragment profileFragment = new ProfileFragment();
                        Bundle args = new Bundle();
                        args.putString("photoUrl",photoUrl);
                        profileFragment.setArguments(args);
                        getSupportFragmentManager().beginTransaction().replace(R.id.contentContainer,profileFragment).commit();
                    }
                }
            }
        });

    }

    @Override
    public void onBackPressed() {
        if (getSupportFragmentManager().getBackStackEntryCount() != 0) {
            getSupportFragmentManager().popBackStack();
        } else {
            if(backButtonCount >= 1)
            {
                Intent intent = new Intent(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_HOME);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
            else
            {
                Toast.makeText(this, "Press the back button once again to close the application.", Toast.LENGTH_SHORT).show();
                backButtonCount++;
            }
        }


    }
}
