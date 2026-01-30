# 📦 GUIA: MOVER DOCUMENTAÇÃO PARA /docs/

## ⚠️ IMPORTANTE:
Este arquivo será **deletado** após você mover todos os .md!

---

## 🎯 **OBJETIVO:**
Mover **36 arquivos .md** da raiz para `/docs/` para organizar o projeto.

---

## 📋 **LISTA DE ARQUIVOS PARA MOVER:**

Copie e cole os comandos abaixo no terminal (Unix/Linux/Mac):

```bash
# Criar pasta docs (se não existir)
mkdir -p docs

# Mover todos os arquivos .md (exceto README.md principal)
mv APRESENTACAO_SISTEMA_PLANOS.md docs/
mv ARQUITETURA_ESCALAVEL.md docs/
mv AUDITORIA_APK_PRODUCAO.md docs/
mv AUDITORIA_CODIGO_COMPLETA.md docs/
mv AUDITORIA_CODIGO_RESUMO.md docs/
mv AUDITORIA_CORES_APK.md docs/
mv CODIGOS_VOUCHER_ATIVOS.md docs/
mv COMECE_AQUI.md docs/
mv COMO_GERAR_APK.md docs/
mv COMO_INSTALAR_ICONE.md docs/
mv COMO_RESETAR_DADOS.md docs/
mv COMO_TROCAR_ICONES.md docs/
mv COMPATIBILIDADE_ANDROID_COMPLETA.md docs/
mv COMPATIBILIDADE_SDK_22.md docs/
mv CORRECAO_COMPLETA_100.md docs/
mv CORRECAO_CORES_TEMAS_COMPLETA.md docs/
mv CORRECAO_FINAL_APK.md docs/
mv CORRECAO_PLAY_PROTECT.md docs/
mv CORRECAO_SDK_22.md docs/
mv CORRECAO_TEMAS_APK.md docs/
mv EXECUTE_AGORA.md docs/
mv GUIA_ICONE_OFICIAL_GABARITOO.md docs/
mv GUIA_SISTEMA_PREMIUM.md docs/
mv GUIA_SISTEMA_VOUCHERS.md docs/
mv INDICE_DOCUMENTACAO.md docs/
mv LIMPEZA_DADOS_ALERR.md docs/
mv LIMPEZA_REALIZADA.md docs/
mv PASSOS_FINAIS_ANDROID_STUDIO.md docs/
mv README_FINAL.md docs/
mv RELATORIO_AUDITORIA_FINAL.md docs/
mv RESUMO_AUDITORIA_CORES.md docs/
mv RESUMO_SDK_CONFIGURACAO.md docs/
mv RESUMO_TRABALHO_ATUAL.md docs/
mv SUBSTITUIR_ICONES_OFICIAIS.md docs/
mv TESTE_CORES_APK.md docs/
mv TOAST_ALERT_CORRIGIDO.md docs/
mv VIBRACAO_APK_VERIFICACAO.md docs/
mv VOUCHER_README.md docs/

# Mover arquivo .txt também
mv INICIO_RAPIDO.txt docs/

echo "✅ Documentação movida com sucesso!"
```

---

## 🪟 **PARA WINDOWS (PowerShell):**

```powershell
# Criar pasta docs (se não existir)
New-Item -ItemType Directory -Force -Path docs

# Mover arquivos
Move-Item -Path "APRESENTACAO_SISTEMA_PLANOS.md" -Destination "docs/"
Move-Item -Path "ARQUITETURA_ESCALAVEL.md" -Destination "docs/"
Move-Item -Path "AUDITORIA_APK_PRODUCAO.md" -Destination "docs/"
Move-Item -Path "AUDITORIA_CODIGO_COMPLETA.md" -Destination "docs/"
Move-Item -Path "AUDITORIA_CODIGO_RESUMO.md" -Destination "docs/"
Move-Item -Path "AUDITORIA_CORES_APK.md" -Destination "docs/"
Move-Item -Path "CODIGOS_VOUCHER_ATIVOS.md" -Destination "docs/"
Move-Item -Path "COMECE_AQUI.md" -Destination "docs/"
Move-Item -Path "COMO_GERAR_APK.md" -Destination "docs/"
Move-Item -Path "COMO_INSTALAR_ICONE.md" -Destination "docs/"
Move-Item -Path "COMO_RESETAR_DADOS.md" -Destination "docs/"
Move-Item -Path "COMO_TROCAR_ICONES.md" -Destination "docs/"
Move-Item -Path "COMPATIBILIDADE_ANDROID_COMPLETA.md" -Destination "docs/"
Move-Item -Path "COMPATIBILIDADE_SDK_22.md" -Destination "docs/"
Move-Item -Path "CORRECAO_COMPLETA_100.md" -Destination "docs/"
Move-Item -Path "CORRECAO_CORES_TEMAS_COMPLETA.md" -Destination "docs/"
Move-Item -Path "CORRECAO_FINAL_APK.md" -Destination "docs/"
Move-Item -Path "CORRECAO_PLAY_PROTECT.md" -Destination "docs/"
Move-Item -Path "CORRECAO_SDK_22.md" -Destination "docs/"
Move-Item -Path "CORRECAO_TEMAS_APK.md" -Destination "docs/"
Move-Item -Path "EXECUTE_AGORA.md" -Destination "docs/"
Move-Item -Path "GUIA_ICONE_OFICIAL_GABARITOO.md" -Destination "docs/"
Move-Item -Path "GUIA_SISTEMA_PREMIUM.md" -Destination "docs/"
Move-Item -Path "GUIA_SISTEMA_VOUCHERS.md" -Destination "docs/"
Move-Item -Path "INDICE_DOCUMENTACAO.md" -Destination "docs/"
Move-Item -Path "LIMPEZA_DADOS_ALERR.md" -Destination "docs/"
Move-Item -Path "LIMPEZA_REALIZADA.md" -Destination "docs/"
Move-Item -Path "PASSOS_FINAIS_ANDROID_STUDIO.md" -Destination "docs/"
Move-Item -Path "README_FINAL.md" -Destination "docs/"
Move-Item -Path "RELATORIO_AUDITORIA_FINAL.md" -Destination "docs/"
Move-Item -Path "RESUMO_AUDITORIA_CORES.md" -Destination "docs/"
Move-Item -Path "RESUMO_SDK_CONFIGURACAO.md" -Destination "docs/"
Move-Item -Path "RESUMO_TRABALHO_ATUAL.md" -Destination "docs/"
Move-Item -Path "SUBSTITUIR_ICONES_OFICIAIS.md" -Destination "docs/"
Move-Item -Path "TESTE_CORES_APK.md" -Destination "docs/"
Move-Item -Path "TOAST_ALERT_CORRIGIDO.md" -Destination "docs/"
Move-Item -Path "VIBRACAO_APK_VERIFICACAO.md" -Destination "docs/"
Move-Item -Path "VOUCHER_README.md" -Destination "docs/"
Move-Item -Path "INICIO_RAPIDO.txt" -Destination "docs/"

Write-Host "✅ Documentação movida com sucesso!" -ForegroundColor Green
```

---

## ✅ **VALIDAR:**

Após mover, execute:

```bash
ls -la docs/
```

Você deve ver **37 arquivos** (36 .md + 1 .txt + 1 README.md)

---

## 🗑️ **APÓS MOVER:**

Delete este arquivo:
```bash
rm MOVER_DOCUMENTACAO.md
```

---

**Próximo passo:** Refatorar App.tsx aplicando o Mega-Prompt!
