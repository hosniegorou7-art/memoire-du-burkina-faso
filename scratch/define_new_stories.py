import json

# Define the 4 authentic stories from christianilboudo.tech
new_stories = [
    {
        "id": "suruku-ni-sonsannin",
        "title": "Suruku ni sonsannin (Le Lièvre et l'Hyène)",
        "nativeTitle": "Suruku ni sonsannin (15 Nziirin nziirin)",
        "regionId": "guiriko",
        "regionName": "Guiriko (Hauts-Bassins / Bobo-Dioulasso)",
        "place": "Bords du marigot de Sya",
        "category": "Conte Initiatique & Animalier",
        "ethnic": "Dioula / Bobo",
        "languages": ["Dioula", "Français"],
        "duration": "4 min 30",
        "year": "Tradition orale séculaire",
        "heroImage": "dioula.png",
        "audioUrl": "/static/audio/suruku-ni-sonsannin.mp3",
        "textCredit": "© Texte dioula par Alou Keïta, Ouagadougou, Burkina Faso, 2021",
        "audioCredit": "© Audio lu par Afsatou Bokoum, Bobo-Dioulasso, Burkina Faso",
        "synopsis": "Suruku (l'hyène) et Sonsannin (le lièvre) partent pêcher au marigot. Le partage quotidien des prises met à l'épreuve leur confiance et leur solidarité jusqu'à ce que la cupidité de l'hyène se retourne contre elle.",
        "moral": "Un franc acquis honnêtement aujourd'hui vaut mieux que cinq francs promis demain. La ruse bienveillante punit toujours la cupidité.",
        "tags": ["Dioula", "Animaux", "Sagesse", "Bobo-Dioulasso"],
        "chapters": [
            {
                "title": "1. Le partage des poissons",
                "textNative": "Lon dɔ suruku ni sonsannin bɛnna ka taga jigɛ minɛ. O lon fɔlɔ o ye jigɛ kelen le sɔrɔ. Sonsannin ko n teri jigɛ kelen ni mɔgɔ fila tilan ka gɛlɛn, jigɛ kelen di n ma sini ni an nana jigɛ fila sɔrɔ, e bina to ni jigɛ fila nin ye. Suruku ko basi te yen.",
                "textFr": "Un jour, l'hyène et le lièvre convinrent d'aller pêcher. Ce premier jour, ils n'attrapèrent qu'un seul poisson. Le lièvre dit : 'Mon ami, un seul poisson à partager entre deux personnes est difficile. Donnez-le moi, et si demain nous en prenons deux, vous aurez les deux'. L'hyène répondit qu'il n'y avait aucun problème."
            },
            {
                "title": "2. Une excuse pour s'éloigner",
                "textNative": "O dugusagɛ, o tagara jigɛminayɔrɔ ra, o ye naani sɔrɔ. Sonsannin ko a bi kuma, suruku ko a ma : kana kunko ɲini a te yɔrɔ min na. Sonsannin ko a ka yafa a ma, nga ale ka lumɔgɔw bi sara, a bina boli ka taga a ɲaɲini. Sonsannin bolila ka taga la suruku ka sira kan.",
                "textFr": "Le lendemain matin, ils retournèrent au lieu de pêche et attrapèrent quatre poissons. Le lièvre chercha un prétexte : 'Mes proches m'appellent de toute urgence, je dois courir les voir !' Le lièvre prit la fuite en emportant discrètement sa part sur le sentier."
            },
            {
                "title": "3. Suruku se rend compte",
                "textNative": "Suruku nana a ye ko sonsannin tun ye min fɔ o ye tiɲɛ le ye ka tɛmɛ ni a yɛrɛ ye. Sonsannin wulila ka taga la suruku ɲa fɛ tugunin. Suruku lɔra ka miiri ni a tun ye sonsannin fila nunu cɛ, a tun bi kɛ supu ɲanaman ye.",
                "textFr": "L'hyène resta seule à réfléchir. Si elle avait préparé les poissons pour faire une bonne soupe au lieu d'écouter les ruses du lièvre, elle ne serait pas là le ventre vide."
            },
            {
                "title": "4. La leçon des aïeux",
                "textNative": "A ye jigɛ bila, ko a be taga sonsannin kelen dɔ nin ta a nana a sɔrɔ ko Sonsannin wulila ka boli ni a ka jigɛ ye. A ma Sonsannin sɔrɔ, a ma a ka jigɛ fana sɔrɔ. O le ra, o ko bi ka dɔrɔmɛ kelen ka fisa ni sini duuru ye.",
                "textFr": "L'hyène abandonna ses poissons pour courir après le lièvre, mais à son retour, les poissons avaient disparu et le lièvre était loin ! C'est pourquoi les anciens disent : un franc aujourd'hui vaut mieux que cinq francs demain."
            }
        ],
        "sections": [
            {
                "title": "1. Le partage des poissons",
                "textNative": "Lon dɔ suruku ni sonsannin bɛnna ka taga jigɛ minɛ. O lon fɔlɔ o ye jigɛ kelen le sɔrɔ. Sonsannin ko n teri jigɛ kelen ni mɔgɔ fila tilan ka gɛlɛn, jigɛ kelen di n ma sini ni an nana jigɛ fila sɔrɔ, e bina to ni jigɛ fila nin ye. Suruku ko basi te yen.",
                "textFr": "Un jour, l'hyène et le lièvre convinrent d'aller pêcher. Ce premier jour, ils n'attrapèrent qu'un seul poisson. Le lièvre dit : 'Mon ami, un seul poisson à partager entre deux personnes est difficile. Donnez-le moi, et si demain nous en prenons deux, vous aurez les deux'. L'hyène répondit qu'il n'y avait aucun problème."
            },
            {
                "title": "2. Une excuse pour s'éloigner",
                "textNative": "O dugusagɛ, o tagara jigɛminayɔrɔ ra, o ye naani sɔrɔ. Sonsannin ko a bi kuma, suruku ko a ma : kana kunko ɲini a te yɔrɔ min na. Sonsannin ko a ka yafa a ma, nga ale ka lumɔgɔw bi sara, a bina boli ka taga a ɲaɲini. Sonsannin bolila ka taga la suruku ka sira kan.",
                "textFr": "Le lendemain matin, ils retournèrent au lieu de pêche et attrapèrent quatre poissons. Le lièvre chercha un prétexte : 'Mes proches m'appellent de toute urgence, je dois courir les voir !' Le lièvre prit la fuite en emportant discrètement sa part sur le sentier."
            },
            {
                "title": "3. Suruku se rend compte",
                "textNative": "Suruku nana a ye ko sonsannin tun ye min fɔ o ye tiɲɛ le ye ka tɛmɛ ni a yɛrɛ ye. Sonsannin wulila ka taga la suruku ɲa fɛ tugunin. Suruku lɔra ka miiri ni a tun ye sonsannin fila nunu cɛ, a tun bi kɛ supu ɲanaman ye.",
                "textFr": "L'hyène resta seule à réfléchir. Si elle avait préparé les poissons pour faire une bonne soupe au lieu d'écouter les ruses du lièvre, elle ne serait pas là le ventre vide."
            },
            {
                "title": "4. La leçon des aïeux",
                "textNative": "A ye jigɛ bila, ko a be taga sonsannin kelen dɔ nin ta a nana a sɔrɔ ko Sonsannin wulila ka boli ni a ka jigɛ ye. A ma Sonsannin sɔrɔ, a ma a ka jigɛ fana sɔrɔ. O le ra, o ko bi ka dɔrɔmɛ kelen ka fisa ni sini duuru ye.",
                "textFr": "L'hyène abandonna ses poissons pour courir après le lièvre, mais à son retour, les poissons avaient disparu et le lièvre était loin ! C'est pourquoi les anciens disent : un franc aujourd'hui vaut mieux que cinq francs demain."
            }
        ]
    },
    {
        "id": "soni-alla-waray",
        "title": "Soni so Alla waray, kaananke warataa!",
        "nativeTitle": "Soni so Alla waray, kaananke warataa! (Fulfulde)",
        "regionId": "soum",
        "regionName": "Sahel / Soum / Liptako",
        "place": "Oasis et pâturages du Sahel",
        "category": "Conte Pastoral & Sagesse",
        "ethnic": "Peul (Fulɓe)",
        "languages": ["Fulfulde", "Français"],
        "duration": "5 min",
        "year": "Tradition pastorale",
        "heroImage": "fulfulde.png",
        "audioUrl": "/static/audio/soni-alla-waray.mp3",
        "audioCredit": "© Récit authentique transmis par Tijjaani Ba, Sahel burkinabè",
        "synopsis": "Si Dieu ne décrète pas la mort d'un être, nulle puissance terrestre ni souverain ne peut lui ôter la vie. La sagesse fulfulde de Tijjaani Ba sur la foi et le destin.",
        "moral": "La foi inébranlable et l'intégrité triomphent de l'orgueil des rois. Nul homme ne peut sceller le destin d'un autre sans la volonté céleste.",
        "tags": ["Fulfulde", "Sahel", "Destin", "Peul"],
        "chapters": [
            {
                "title": "1. L'avertissement du sage",
                "textNative": "Soni so Alla waray, kaananke warataa! Goɗɗo wonnoo de, wawtu fu o wi'ataanaa soni Alla waray, ni kaananke warataa. Jakka na ɗum metti kaanankee hunnde.",
                "textFr": "Un homme sage répétait sans cesse : 'Si Dieu ne tue pas, le roi ne peut tuer !' Cela blessa profondément l'orgueil du roi qui décida de le mettre à mort par la ruse."
            },
            {
                "title": "2. Le pêcheur et la bague royale",
                "textNative": "Heddii kaananke itti fiyaare muuɗum, o addi fiyaare ndeen, o reeni o. Kaananke acci faa o dilli de wi'i goɗɗo soosoo addowa fiyaare nde, faɗɗa e maayo. Heɓa wara ƴamta o.",
                "textFr": "Le roi lui confia sa précieuse bague royale, puis ordonna secrètement qu'on la lui dérobe pour la jeter au fond du grand fleuve, afin de pouvoir accuser le sage de trahison."
            },
            {
                "title": "3. Le poisson providentiel",
                "textNative": "Suka gorko du wallaa nyaamdu so wanaa liƴƴi. Nde o faɗɗunoo nde fu liinga moɗi nde. Awottooɗo awooken heɓii linga ngaan fantii sottirii o. O huttunoo nga ni o tawi fiyaare nder reedu liinnga.",
                "textFr": "Un grand poisson avala l'anneau au fond de l'eau. Un humble jeune pêcheur captura ce poisson et, en le vidant, découvrit avec stupeur la bague royale dans ses entrailles."
            },
            {
                "title": "4. La sentence déjouée",
                "textNative": "Nyannde gom ni kaananke nilani suka gorko. O yottinoo ni o wi'aa o wadda fiyaare. Suka gorko wi'i gasii. Min kaa faa hannde, hannde e jaango fu, kaan keddii-mi nam jeerfoo. Soni so Alla waray fu, kaananke warataa!",
                "textFr": "Le roi convoqua le sage pour exiger la bague sous peine de décapitation immédiate. Le sage sortit l'anneau intact ! Le roi s'inclina devant la vérité éternelle : 'Si Dieu ne te condamne pas, le roi ne peut rien contre toi !'"
            }
        ],
        "sections": [
            {
                "title": "1. L'avertissement du sage",
                "textNative": "Soni so Alla waray, kaananke warataa! Goɗɗo wonnoo de, wawtu fu o wi'ataanaa soni Alla waray, ni kaananke warataa. Jakka na ɗum metti kaanankee hunnde.",
                "textFr": "Un homme sage répétait sans cesse : 'Si Dieu ne tue pas, le roi ne peut tuer !' Cela blessa profondément l'orgueil du roi qui décida de le mettre à mort par la ruse."
            },
            {
                "title": "2. Le pêcheur et la bague royale",
                "textNative": "Heddii kaananke itti fiyaare muuɗum, o addi fiyaare ndeen, o reeni o. Kaananke acci faa o dilli de wi'i goɗɗo soosoo addowa fiyaare nde, faɗɗa e maayo. Heɓa wara ƴamta o.",
                "textFr": "Le roi lui confia sa précieuse bague royale, puis ordonna secrètement qu'on la lui dérobe pour la jeter au fond du grand fleuve, afin de pouvoir accuser le sage de trahison."
            },
            {
                "title": "3. Le poisson providentiel",
                "textNative": "Suka gorko du wallaa nyaamdu so wanaa liƴƴi. Nde o faɗɗunoo nde fu liinga moɗi nde. Awottooɗo awooken heɓii linga ngaan fantii sottirii o. O huttunoo nga ni o tawi fiyaare nder reedu liinnga.",
                "textFr": "Un grand poisson avala l'anneau au fond de l'eau. Un humble jeune pêcheur captura ce poisson et, en le vidant, découvrit avec stupeur la bague royale dans ses entrailles."
            },
            {
                "title": "4. La sentence déjouée",
                "textNative": "Nyannde gom ni kaananke nilani suka gorko. O yottinoo ni o wi'aa o wadda fiyaare. Suka gorko wi'i gasii. Min kaa faa hannde, hannde e jaango fu, kaan keddii-mi nam jeerfoo. Soni so Alla waray fu, kaananke warataa!",
                "textFr": "Le roi convoqua le sage pour exiger la bague sous peine de décapitation immédiate. Le sage sortit l'anneau intact ! Le roi s'inclina devant la vérité éternelle : 'Si Dieu ne te condamne pas, le roi ne peut rien contre toi !'"
            }
        ]
    },
    {
        "id": "nin-keem",
        "title": "Nin-kẽem a yembr kibare (L'Enfant et le Lion)",
        "nativeTitle": "Nin-kẽem a yembr kibare (Mooré)",
        "regionId": "kadiogo",
        "regionName": "Kadiogo / Oubri (Centre)",
        "place": "Plateau mossi et collines rocheuses",
        "category": "Conte Moral & Initiatique",
        "ethnic": "Mossi",
        "languages": ["Mooré", "Français"],
        "duration": "5 min 30",
        "year": "Tradition ancestrale",
        "heroImage": "mossi.png",
        "audioUrl": "/static/audio/nin-keem.mp3",
        "audioCredit": "© Récit authentique transmis en langue Mooré",
        "synopsis": "Un enfant déjoue la ruse redoutable du lion Weoognaab et sauve son vieux père grâce à son écoute attentive, son chant rusé et sa présence d'esprit.",
        "moral": "Bɩ d ra kɩɩs d kambã noor wakat ning ye, d mi n kelgd-ba. N'ignorons jamais la clairvoyance des enfants, sachons les écouter avec sagesse.",
        "tags": ["Mooré", "Courage", "Lion", "Enfance"],
        "chapters": [
            {
                "title": "1. Le départ en brousse",
                "textNative": "Nin-kẽem a yembr n wa n yik a zak pʋgẽ, n na n tɩ gõ weoogẽ. La, a bi-bilf a yembr yikame, t'a na n tũ-a lame. La, a ba wã tõdgame, t'a kõn tũ ye.",
                "textFr": "Un vieil homme quitta sa concession pour marcher en brousse. Son jeune fils insista pour l'accompagner, mais le père refusa car le chemin était semé de dangers."
            },
            {
                "title": "2. L'orage et la caverne du lion",
                "textNative": "B sẽn wa n ta we-raoogã pʋga, saag n kʋɩ, tɩ sebgã sɩng yikri. B zoe n tɩ kẽe tãng bokẽ, n na n sool saagã. Mik bokã yaa m ba Weoognaab roogo. M ba Weoognaab yɩɩll n yetẽ : 'Roog vũuda, roog vũud tɩ m meng be yɩng n daeeda'.",
                "textFr": "L'orage éclata avec fureur. Ils coururent s'abriter au creux d'une caverne qui était en réalité l'antre du lion Weoognaab. Le lion approcha en chantant avec fierté pour effrayer ses proies."
            },
            {
                "title": "3. La réponse rusée de l'enfant",
                "textNative": "Tɩ biigã leok-a : 'M pa sablem naaba, m pa zẽenem naaba, sã n pa beoogo, tõnd pa kuus ye.' M ba Weoognaab sẽn wʋm dẽ, a kɩdmame, n zoe n maan wa kɩlomɛtr a yiibu.",
                "textFr": "L'enfant prit la parole d'une voix grave et mystérieuse : 'Je ne crains ni le maître noir, ni le maître rouge !' En entendant cette voix surnaturelle, le lion terrifié prit la fuite à plus de deux kilomètres !"
            },
            {
                "title": "4. Le retour et la reconnaissance",
                "textNative": "Tɩ biigã tũnug m ba Weoognaab loogrã, n yi n dɩk sor n zoe n kuili. Wakat-kãng tɩ b taa yiri. Yaa woto, la biigã maan n fãag a ba wã, la a menga.",
                "textFr": "Profitant de la fuite du lion, l'enfant guida son père hors de la grotte et ils regagnèrent sains et saufs leur concession. C'est ainsi que l'enfant sauva la vie de son père."
            }
        ],
        "sections": [
            {
                "title": "1. Le départ en brousse",
                "textNative": "Nin-kẽem a yembr n wa n yik a zak pʋgẽ, n na n tɩ gõ weoogẽ. La, a bi-bilf a yembr yikame, t'a na n tũ-a lame. La, a ba wã tõdgame, t'a kõn tũ ye.",
                "textFr": "Un vieil homme quitta sa concession pour marcher en brousse. Son jeune fils insista pour l'accompagner, mais le père refusa car le chemin était semé de dangers."
            },
            {
                "title": "2. L'orage et la caverne du lion",
                "textNative": "B sẽn wa n ta we-raoogã pʋga, saag n kʋɩ, tɩ sebgã sɩng yikri. B zoe n tɩ kẽe tãng bokẽ, n na n sool saagã. Mik bokã yaa m ba Weoognaab roogo. M ba Weoognaab yɩɩll n yetẽ : 'Roog vũuda, roog vũud tɩ m meng be yɩng n daeeda'.",
                "textFr": "L'orage éclata avec fureur. Ils coururent s'abriter au creux d'une caverne qui était en réalité l'antre du lion Weoognaab. Le lion approcha en chantant avec fierté pour effrayer ses proies."
            },
            {
                "title": "3. La réponse rusée de l'enfant",
                "textNative": "Tɩ biigã leok-a : 'M pa sablem naaba, m pa zẽenem naaba, sã n pa beoogo, tõnd pa kuus ye.' M ba Weoognaab sẽn wʋm dẽ, a kɩdmame, n zoe n maan wa kɩlomɛtr a yiibu.",
                "textFr": "L'enfant prit la parole d'une voix grave et mystérieuse : 'Je ne crains ni le maître noir, ni le maître rouge !' En entendant cette voix surnaturelle, le lion terrifié prit la fuite à plus de deux kilomètres !"
            },
            {
                "title": "4. Le retour et la reconnaissance",
                "textNative": "Tɩ biigã tũnug m ba Weoognaab loogrã, n yi n dɩk sor n zoe n kuili. Wakat-kãng tɩ b taa yiri. Yaa woto, la biigã maan n fãag a ba wã, la a menga.",
                "textFr": "Profitant de la fuite du lion, l'enfant guida son père hors de la grotte et ils regagnèrent sains et saufs leur concession. C'est ainsi que l'enfant sauva la vie de son père."
            }
        ]
    },
    {
        "id": "conte-bissa",
        "title": "Conte traditionnel en langue Bissa",
        "nativeTitle": "Bissa gʋ-kibare",
        "regionId": "nakambe",
        "regionName": "Nakambé / Centre-Est (Garango)",
        "place": "Terroirs de Garango et rives du Nakambé",
        "category": "Conte & Récit Patrimonial",
        "ethnic": "Bissa",
        "languages": ["Bissa", "Français"],
        "duration": "6 min",
        "year": "Tradition ancestrale",
        "heroImage": "bissa.png",
        "audioUrl": "/static/audio/conte-bissa.mp3",
        "audioCredit": "© Enregistrement patrimonial sonore direct en langue Bissa",
        "synopsis": "Enregistrement sonore patrimonial en langue Bissa transmis par les aînés de Garango. Ce récit célèbre la musicalité, la poésie et la mémoire de la communauté Bissa.",
        "moral": "La voix de la langue maternelle est le pont indestructible qui relie les générations à travers les siècles.",
        "tags": ["Bissa", "Garango", "Oralité", "Centre-Est"],
        "chapters": [
            {
                "title": "1. Écouter le récit en langue Bissa",
                "textNative": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale.",
                "textFr": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale. Écoutez la diction authentique, le rythme et les inflexions poétiques de la langue Bissa enregistrée par les dépositaires de la tradition."
            }
        ],
        "sections": [
            {
                "title": "1. Écouter le récit en langue Bissa",
                "textNative": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale.",
                "textFr": "Le fichier audio en langue Bissa est disponible dans son intégralité sonore originale. Écoutez la diction authentique, le rythme et les inflexions poétiques de la langue Bissa enregistrée par les dépositaires de la tradition."
            }
        ]
    }
]

print("Defined new stories:", len(new_stories))
