package com.laniuslab.studioteam.formulae.Fragment;


import android.app.ProgressDialog;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.firebase.ui.storage.images.FirebaseImageLoader;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.laniuslab.studioteam.formulae.Fragment.DriversTab.DriverFragment;
import com.laniuslab.studioteam.formulae.R;
import com.mapbox.mapboxsdk.MapboxAccountManager;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.annotations.PolylineOptions;
import com.mapbox.mapboxsdk.camera.CameraPosition;
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.services.Constants;
import com.mapbox.services.commons.ServicesException;
import com.mapbox.services.commons.geojson.LineString;
import com.mapbox.services.commons.models.Position;
import com.mapbox.services.directions.v5.DirectionsCriteria;
import com.mapbox.services.directions.v5.MapboxDirections;
import com.mapbox.services.directions.v5.models.DirectionsResponse;
import com.mapbox.services.directions.v5.models.DirectionsRoute;

import org.w3c.dom.Text;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.bumptech.glide.load.DecodeFormat.PREFER_ARGB_8888;

/**
 * A simple {@link Fragment} subclass.
 */
public class DashboardFragment extends Fragment implements View.OnClickListener{


    public DashboardFragment() {
        // Required empty public constructor
    }

    public ImageView iv_tittle,iv_circuit;
    public TextView textR,textDate,textCircuitlegth,textTurns, textTittle1,textTittle2,textTittle3;
    public Button btn_eventmap,btn_schedule;
    public ScrollView contentLastest;
    public String tittle_photoURL, circuit_photoURL;
    private ProgressDialog progressDialog;
    //private ImageView mapCircuit;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        Bundle args = new Bundle();
        args = getArguments();
        String getTittlePhotourl = args.getString("tittle_photoUrl");
        String getCircuitPhotourl = args.getString("circuit_photoUrl");
        Log.d("tittle",String.valueOf(getTittlePhotourl));
        Log.d("circuit",String.valueOf(getCircuitPhotourl));
        progressDialog = new ProgressDialog(DashboardFragment.this.getActivity());
        progressDialog.setMessage("Loading");
        progressDialog.setCanceledOnTouchOutside(false);
        progressDialog.show();
        textR = (TextView)view.findViewById(R.id.tv_r);
        textDate = (TextView)view.findViewById(R.id.tv_date);
        textCircuitlegth = (TextView)view.findViewById(R.id.tv_circuitlength);
        textTurns = (TextView)view.findViewById(R.id.tv_turns);
        textTittle1 = (TextView)view.findViewById(R.id.tv_racetittle);
        textTittle2 = (TextView)view.findViewById(R.id.tv_racetittle1);
        textTittle3 = (TextView)view.findViewById(R.id.tv_racetittle2);
        iv_tittle = (ImageView)view.findViewById(R.id.iv_tittle);
        iv_circuit = (ImageView)view.findViewById(R.id.iv_circuit);
        btn_eventmap = (Button)view.findViewById(R.id.btn_eventmap);
        btn_schedule = (Button)view.findViewById(R.id.btn_schedule);
        contentLastest = (ScrollView)view.findViewById(R.id.contentLastest);

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference lastestReference = database.getReference().child(com.laniuslab.studioteam.formulae.utils.Constants.LASTEST);
        lastestReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                textR.setText("R"+dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.RACE).getValue(String.class));
                textDate.setText(" | "+dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.DATE).getValue(String.class));
                textCircuitlegth.setText(dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.CIRCUITLENGTH).getValue(String.class)+" KM");
                textTurns.setText(dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.CIRCUITTURNS).getValue(String.class)+" TURNS");
                textTittle1.setText(dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.RACETITTLE).getValue(String.class));
                textTittle2.setText(dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.RACETITTLE).getValue(String.class));
                textTittle3.setText(dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.RACETITTLE).getValue(String.class));
                tittle_photoURL = dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.TITTLEPHOTOURL).getValue(String.class);
                circuit_photoURL = dataSnapshot.child(com.laniuslab.studioteam.formulae.utils.Constants.CIRCUITPHOTOURL).getValue(String.class);
                Glide.with(DashboardFragment.this.getActivity())
                        .load(tittle_photoURL)
                        .thumbnail(0.5f)
                        .crossFade()
                        .diskCacheStrategy(DiskCacheStrategy.ALL)
                        .into(iv_tittle);
                Glide.with(DashboardFragment.this.getActivity())
                        .load(circuit_photoURL)
                        .asBitmap()
                        .format(PREFER_ARGB_8888)
                        .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                        .into(iv_circuit);

                progressDialog.dismiss();
                contentLastest.setVisibility(View.VISIBLE);

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });




        return view;
    }

    @Override
    public void onClick(View view) {
        /*switch (view.getId()){
            case R.id.circuitButton :
                MapFragment mapFragment = new MapFragment();
                getFragmentManager().beginTransaction().replace(R.id.contentContainer, mapFragment).addToBackStack("tag").commit();
                break;
        }*/
    }
}
