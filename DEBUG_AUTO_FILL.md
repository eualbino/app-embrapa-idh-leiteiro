# 🔍 DEBUG - Auto-Preenchimento de Campos

Este documento te guiará para identificar por que os campos não estão sendo preenchidos automaticamente.

## 📋 Passo a Passo para Debug

### 1️⃣ Abrir o Console do Desenvolvedor

**React Native / Expo:**
- Pressione `Ctrl + M` (Android) ou `Cmd + D` (iOS) no emulador
- Selecione "Debug" ou "Open Debugger"
- Ou rode: `npx expo start` e pressione `j` para abrir o debugger

**Console do Navegador (se usando web):**
- Pressione `F12` ou `Ctrl + Shift + I`
- Vá na aba "Console"

### 2️⃣ Faça Login na Aplicação

1. Entre com suas credenciais
2. Observe o console - você deve ver logs como:

```
🔐 AuthContext - /me response: { user: {...}, properties: [...] }
👤 AuthContext - User: { id: "...", name: "Lucas Goncalves", ... }
🏠 AuthContext - Properties: [ {...}, {...}, ... ]
📊 AuthContext - Properties count: 1
```

### 3️⃣ Navegue até a Página de Questionário

1. Acesse a página de questionário/caracterização
2. No console, procure por estes logs:

```
🔍 Auto-fill useEffect triggered
📦 properties: [ {...} ]
📊 properties.length: 1
📝 formData: null
```

### 4️⃣ Analise os Logs

#### ✅ **CENÁRIO 1: Tudo funcionando corretamente**

Você deve ver:
```
🔍 Auto-fill useEffect triggered
📦 properties: [{...}]
📊 properties.length: 1
📝 formData: null
✅ Conditions met! Auto-filling form...
🏠 Most recent property: { id: "...", country: "Brasil", city: "São Carlos", ... }
📋 Converted FormData: { localizacao: {...}, area: {...}, ... }
✨ FormData set!
🔄 Updating form state with initialData: { localizacao: {...}, ... }
```

#### ❌ **CENÁRIO 2: Properties não carregadas**

Se você ver:
```
🔍 Auto-fill useEffect triggered
📦 properties: []
📊 properties.length: 0
📝 formData: null
❌ Conditions not met:
  - Has properties: true
  - Properties length > 0: false
  - formData is null: true
```

**Problema:** O endpoint `/me` não está retornando properties.

**Solução:** 
- Verifique se o backend está retornando properties no response
- Verifique se você tem propriedades cadastradas no banco

#### ❌ **CENÁRIO 3: formData já existe**

Se você ver:
```
🔍 Auto-fill useEffect triggered
📦 properties: [{...}]
📊 properties.length: 1
📝 formData: { localizacao: {...}, ... }
❌ Conditions not met:
  - Has properties: true
  - Properties length > 0: true
  - formData is null: false
```

**Problema:** O formData já foi preenchido antes (pode ter dados do localStorage/cache).

**Solução:**
- Limpe o cache do app
- Ou adicione lógica para sobrescrever formData existente

#### ❌ **CENÁRIO 4: Properties é undefined**

Se você ver:
```
🔍 Auto-fill useEffect triggered
📦 properties: undefined
📊 properties.length: undefined
📝 formData: null
❌ Conditions not met:
  - Has properties: false
  - Properties length > 0: false
  - formData is null: true
```

**Problema:** AuthContext não está sendo carregado corretamente.

**Solução:**
- Verifique se o QuestionnaireProvider está dentro do AuthProvider
- Verifique a estrutura de providers no _layout.tsx

### 5️⃣ **Verifique o Response do /me**

Abra o Network do DevTools e procure pela requisição `/me`:

**Response esperado:**
```json
{
  "user": {
    "id": "220cf4fa-bc28-4b4c-9b0e-eb7f445442ef",
    "name": "Lucas Goncalves",
    "email": "lucas.g.apostolo@gmail.com",
    ...
  },
  "properties": [
    {
      "id": "40cf63e2-a8ee-464f-bc20-10c45b1ff0d4",
      "country": "Brasil",
      "city": "São Carlos",
      "productionSystem": "PASTO",
      "totalAreaHa": 95,
      "pastureAreaHa": 46,
      "silageAreaHa": 34,
      "monthlyEnergyKWh": 20,
      "hasPhotovoltaicEnergy": false,
      "hasEnvironmentalLicense": "NAO",
      "hasWaterGrant": "SIM",
      ...
    }
  ]
}
```

### 6️⃣ **Teste os Campos Manualmente**

Após os logs aparecerem, verifique se os campos foram preenchidos:

- [ ] País está preenchido?
- [ ] Cidade está preenchida?
- [ ] Sistema de Produção está selecionado?
- [ ] Área Total está preenchida?
- [ ] Consumo de Energia está preenchido?
- [ ] Fotovoltaica está marcado corretamente?
- [ ] Licença Ambiental está selecionada?
- [ ] Outorga de Água está selecionada?

## 📝 Me Envie Estas Informações

Por favor, copie e cole do console:

### 1. Logs do AuthContext (Login):
```
[Cole aqui os logs que começam com 🔐 AuthContext]
```

### 2. Logs do Auto-fill:
```
[Cole aqui os logs que começam com 🔍]
```

### 3. Response do /me:
```json
[Cole aqui o JSON completo do response do /me]
```

### 4. Estado dos Campos:
```
- País: [preenchido/vazio]
- Cidade: [preenchido/vazio]
- Sistema de Produção: [preenchido/vazio]
- Área Total: [preenchido/vazio]
- Energia Mensal: [preenchido/vazio]
- Fotovoltaica: [preenchido/vazio]
- Licença Ambiental: [preenchido/vazio]
- Outorga: [preenchido/vazio]
```

## 🔧 Soluções Rápidas

### Solução 1: Forçar Reload
1. Feche o app completamente
2. Limpe o cache: `npx expo start -c`
3. Faça login novamente

### Solução 2: Verificar Estrutura de Providers
Verifique se no `_layout.tsx` a estrutura está assim:

```tsx
<AuthProvider>
  <QuestionnaireProvider>
    {/* Resto do app */}
  </QuestionnaireProvider>
</AuthProvider>
```

### Solução 3: Dados Offline
Se você tem dados salvos offline (OfflineSyncService), eles podem estar sobrescrevendo.

Limpe o AsyncStorage:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.clear();
```

---

## 🎯 Checklist Final

- [ ] Console aberto e visível
- [ ] Fiz login e vi os logs do AuthContext
- [ ] Naveguei até a página de questionário
- [ ] Vi os logs do Auto-fill useEffect
- [ ] Verifiquei o response do /me no Network
- [ ] Testei os campos no formulário
- [ ] Copiei os logs para enviar

---

**Com essas informações, conseguirei identificar exatamente o que está acontecendo!** 🚀