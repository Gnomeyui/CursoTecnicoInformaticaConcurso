package com.alerr.top5;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatDelegate;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 🔒 FORÇA MODO CLARO EM NÍVEL DE CÓDIGO
        // Desabilita completamente o Dark Mode automático do Android
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
    }
}
