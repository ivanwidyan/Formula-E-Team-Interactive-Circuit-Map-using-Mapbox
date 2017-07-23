package com.laniuslab.studioteam.formulae;

import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.IdRes;
import android.support.annotation.NonNull;
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
import com.laniuslab.studioteam.formulae.Fragment.DashboardFragment;
import com.laniuslab.studioteam.formulae.Fragment.ProfileFragment;
import com.laniuslab.studioteam.formulae.R;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabSelectListener;

public class NewHomeActivity extends AppCompatActivity {
    public int backButtonCount;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_home);
        FragmentTransaction tx = getSupportFragmentManager().beginTransaction();
        tx.replace(R.id.contentContainer, new DashboardFragment());
        tx.commit();
        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                if (tabId == R.id.tab_recent) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                    DashboardFragment dashboardFragment = new DashboardFragment();
                    getSupportFragmentManager().beginTransaction().replace(R.id.contentContainer,dashboardFragment).commit();
                }
                if (tabId == R.id.tab_race) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                }
                if (tabId == R.id.tab_driver) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                }
                if (tabId == R.id.tab_video) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                }
                if (tabId == R.id.tab_profile) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                    if(FirebaseAuth.getInstance().getCurrentUser() == null){
                        Intent i = new Intent(getApplicationContext(), AuthenticationActivity.class);
                        startActivity(i);
                    }else{
                        ProfileFragment profileFragment = new ProfileFragment();
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
