---
title: "Bienvenue sur le thème Kong-Htop"
date: 2024-01-15
description: "Un article de bienvenue présentant les fonctionnalités de base du thème Kong-Htop"
tags: ["hugo", "thème", "exemple"]
categories: ["Tutoriel"]
image: "https://via.placeholder.com/800x600"
---

## 👋 Bienvenue

Bienvenue sur le thème **Kong-Htop** ! Il s'agit d'un thème Hugo moderne et élégant avec un style de design glassmorphisme.

## ✨ Fonctionnalités du thème

Ce thème offre de nombreuses fonctionnalités puissantes :

- 🎨 **Design Glassmorphisme Moderne** - Style de conception UI avec effet de verre
- 🌓 **Support Complet du Mode Sombre** - Détection automatique des préférences du thème système
- 📱 **Design Réactif** - Support parfait pour ordinateur de bureau, tablette et appareils mobiles
- 🏷️ **Nuage de Tags Moderne** - Taille de police dynamique et animations au survol
- 📝 **Chronologie des Articles** - Vue de liste compacte groupée par année
- 🔍 **Fonction de Recherche Locale** - Recherche locale en texte intégral basée sur JSON
- 📚 **Table des Matières des Articles** - Navigation dans la barre latérale générée automatiquement
- ⚡ **Haute Performance** - Animations accélérées par GPU et CSS optimisé

## 🚀 Démarrage Rapide

### 1. Installer le thème

```bash
git submodule add https://github.com/yezihack/kong-htop.git themes/kong-htop
```

### 2. Configurer le site

Copier l'exemple de configuration :

```bash
cp themes/kong-htop/exampleSite/hugo.toml ./
```

### 3. Créer un article

```bash
hugo new posts/my-post.md
```

### 4. Aperçu local

```bash
hugo server
```

Visitez `http://localhost:1313` pour voir le résultat.

<!-- more -->

## 💡 Conseils pour la Rédaction d'Articles

### Utilisation du Front Matter

```yaml
---
title: "Titre de l'article"
date: 2024-01-15
description: "Description de l'article"
tags: ["tag1", "tag2"]
categories: ["catégorie"]
image: "cover.jpg"
---
```

### Fonctionnalités Markdown Prises en Charge

#### Listes

- Élément 1
- Élément 2
- Élément 3

#### Blocs de code

```go
package main

import "fmt"

func main() {
    fmt.Println("Bonjour, Kong-Htop !")
}
```

#### Tableaux

| Fonctionnalité | Description | Statut |
|----------------|-------------|--------|
| Mode Sombre | Commutation auto | ✅ |
| Recherche | Recherche locale | ✅ |
| Réactif | Adaptatif mobile | ✅ |

#### Citations

> Ceci est un bloc de citation. Vous pouvez l'utiliser dans les articles pour mettre en évidence des informations importantes.

#### Formules Mathématiques (KaTeX)

Prend en charge les formules mathématiques LaTeX :

$$E = mc^2$$

## 🎨 Personnaliser le Thème

### Changer les couleurs

Modifier la configuration des couleurs dans `hugo.toml` :

```toml
[params]
    link_color = "#268bd2"  # Couleur des liens
    text_color = "#222"     # Couleur du texte
```

### Ajouter les réseaux sociaux

```toml
[params]
    github_url = "https://github.com/your-username"
    twitter_url = "https://twitter.com/your-handle"
```

## 📊 Optimisation des Performances

Ce thème a été optimisé pour :

- ✅ Optimisation des sélecteurs CSS
- ✅ Animations accélérées par GPU
- ✅ Chargement de scripts à la demande
- ✅ Support du chargement différé des images

## 🔗 Liens Utiles

- [Documentation Complète](https://github.com/yezihack/kong-htop/)
- [Guide de Démarrage Rapide](https://github.com/yezihack/kong-htop/blob/main/GETTING_STARTED.md)
- [Kong-Htop GitHub](https://github.com/yezihack/kong-htop)
- [Site Officiel Hugo](https://gohugo.io/)

## 📝 Prochaines Étapes

1. **Modifier la Configuration** - Modifier `hugo.toml` pour configurer votre site
2. **Créer du Contenu** - Utiliser `hugo new posts/your-post.md` pour créer de nouveaux articles
3. **Personnaliser les Styles** - Ajouter des styles personnalisés dans `assets/css/`
4. **Déployer le Site** - Déployer votre site sur GitHub Pages, Netlify, etc.

## 🎉 Bonne Rédaction

Vous êtes maintenant prêt à commencer à écrire ! Profitez du thème Kong-Htop.

---

**Besoin d'Aide ?** Consultez [GitHub Issues](https://github.com/yezihack/kong-htop/issues) ou [Documentation Hugo](https://gohugo.io/documentation/).

