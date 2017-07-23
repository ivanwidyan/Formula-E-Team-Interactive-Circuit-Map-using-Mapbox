package com.laniuslab.studioteam.formulae.Fragment;


import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.facebook.login.LoginManager;
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
import com.laniuslab.studioteam.formulae.AuthenticationActivity;
import com.laniuslab.studioteam.formulae.HomeActivity;
import com.laniuslab.studioteam.formulae.NewHomeActivity;
import com.laniuslab.studioteam.formulae.R;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * A simple {@link Fragment} subclass.
 */
public class ProfileFragment extends Fragment implements View.OnClickListener {


    public ProfileFragment() {
        // Required empty public constructor
    }
    private CircleImageView profileImage;
    private TextView profileName;
    private ProgressDialog progressDialog;
    private Button buttonLogout;

    private FirebaseAuth firebaseAuth;
    private FirebaseAuth.AuthStateListener firebaseAuthListener;
    private GoogleApiClient mGoogleApiClient;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        profileImage = (CircleImageView)view.findViewById(R.id.profile_image);
        profileName = (TextView) view.findViewById(R.id.profile_name);
        buttonLogout = (Button) view.findViewById(R.id.buttonLogout);
        firebaseAuth = FirebaseAuth.getInstance();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        mGoogleApiClient = new GoogleApiClient.Builder(ProfileFragment.this.getActivity())
                .enableAutoManage(ProfileFragment.this.getActivity(), new GoogleApiClient.OnConnectionFailedListener() {
                    @Override
                    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
                        Toast.makeText(ProfileFragment.this.getActivity(),"ERROR! Please Try Again Later", Toast.LENGTH_LONG).show();
                    }
                })
                .addApi(Auth.GOOGLE_SIGN_IN_API,gso)
                .build();

        buttonLogout.setOnClickListener(this);
        progressDialog = new ProgressDialog(ProfileFragment.this.getActivity());
        progressDialog.setMessage("Loading");
        progressDialog.setCanceledOnTouchOutside(false);
        progressDialog.show();
        FirebaseUser user = firebaseAuth.getCurrentUser();
        String useremail = user.getEmail();
        String fix_email = useremail.replace(".",",");
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference userReference = database.getReference().child("user").child(fix_email);
        userReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                profileName.setText(dataSnapshot.child("nama").getValue(String.class));
                String photoUrl = dataSnapshot.child("photoUrl").getValue(String.class);
                if(photoUrl==null){

                }else{
                    Glide.with(getActivity().getApplicationContext()).load(photoUrl)
                            .thumbnail(0.5f)
                            .crossFade()
                            .diskCacheStrategy(DiskCacheStrategy.ALL)
                            .into(profileImage);

                }
                progressDialog.dismiss();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
        return view;
    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        switch (id){
            case R.id.buttonLogout:
                revokeAccess();
                break;
        }

    }

    private void revokeAccess() {
        // Firebase sign out
        firebaseAuth.signOut();

        // Google revoke access
        Auth.GoogleSignInApi.signOut(mGoogleApiClient);

        // Facebook logout access
        LoginManager.getInstance().logOut();

        Toast.makeText(ProfileFragment.this.getActivity(),"Log Out Successful", Toast.LENGTH_SHORT).show();
        Intent i = new Intent(ProfileFragment.this.getContext(), NewHomeActivity.class);
        startActivity(i);

        //Go to Main Screen
        //startActivity(new Intent(UserActivity.this, MainActivity.class));
    }
}
