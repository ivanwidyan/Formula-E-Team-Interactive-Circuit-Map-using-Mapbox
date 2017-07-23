package com.laniuslab.studioteam.formulae.Fragment;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.laniuslab.studioteam.formulae.R;

/**
 * A simple {@link Fragment} subclass.
 */
public class DashboardFragment extends Fragment implements View.OnClickListener{


    public DashboardFragment() {
        // Required empty public constructor
    }

    private ImageView mapCircuit;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        mapCircuit = (ImageView)view.findViewById(R.id.circuitButton);
        mapCircuit.setOnClickListener(this);
        return view;
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.circuitButton :
                MapFragment mapFragment = new MapFragment();
                getFragmentManager().beginTransaction().replace(R.id.contentContainer, mapFragment).addToBackStack("tag").commit();
                break;
        }
    }
}
