package com.alerr.top5;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatDelegate;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 🔒 FORÇA MODO CLARO EM NÍVEL DE CÓDIGO
        // Desabilita completamente o Dark Mode automático do Android
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        
        // 🎨 DESABILITA Force Dark na WebView
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            WebView webView = getBridge().getWebView();
            if (webView != null && webView.getSettings() != null) {
                // Desabilita o Force Dark automático
                webView.getSettings().setForceDark(android.webkit.WebSettings.FORCE_DARK_OFF);
            }
        }
    }
}
