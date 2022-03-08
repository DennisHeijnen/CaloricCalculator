		var telegram_token = config.TELEGRAM_BOT_TOKEN;
		var chat_token = config.CHAT_ID;

		function caloricCalculator() {
			//Define input variables
			var sexObj = document.getElementById('sex').value;
			var bodyWeightObj = document.getElementById('bodyWeight').value;
			var fatPercentageObj = document.getElementById('fatPercentage').value;
			var thermicEffectFoodObj = document.getElementById('thermicEffectFood').value;
			var physicalActivityLevelObj = document.getElementById('physicalActivityLevel').value;
			var trainingDaysObj = document.getElementById('trainingDays').value;
			var trainingTimeObj = document.getElementById('trainingTime').value;
			var experienceLevelObj = document.getElementById('experienceLevel').value;

			//Define caloric intake variables
			var maintenanceLevelObj = document.getElementById('maintenanceLevel');
			var cutCaloricIntakeObj = document.getElementById('cutCaloricIntake');
			var bulkCaloricIntakeObj = document.getElementById('bulkCaloricIntake');

			//Define macro variables
			var proteinIntakeMaintenanceObj = document.getElementById('proteinIntakeMaintenance');
			var carbohydrateIntakeMaintenanceObj = document.getElementById('carbohydrateIntakeMaintenance');
			var fatIntakeMaintenanceObj = document.getElementById('fatIntakeMaintenance');
			var proteinIntakeCutObj = document.getElementById('proteinIntakeCut');
			var carbohydrateIntakeCutObj = document.getElementById('carbohydrateIntakeCut');
			var fatIntakeCutObj = document.getElementById('fatIntakeCut');
			var proteinIntakeBulkObj = document.getElementById('proteinIntakeBulk');
			var carbohydrateIntakeBulkObj = document.getElementById('carbohydrateIntakeBulk');
			var fatIntakeBulkObj = document.getElementById('fatIntakeBulk');

			//Error handling
			if(bodyWeightObj.length === 0 || fatPercentageObj.length === 0 || trainingDaysObj.length === 0 || trainingTimeObj.length === 0) {
		        alert('Input forgotten');
		        return;
		    };
		    if (trainingDaysObj < 0 || trainingDaysObj > 7) {
		    	alert('Number of training days not valid');
		        return;
		    }
		    if (fatPercentageObj < 0 || fatPercentageObj > 100) {
		    	alert('Fat percentage not valid');
		        return;
		    }
		    if (bodyWeightObj < 1) {
		    	alert('Body weight not valid');
		        return;
		    }

		    //Calculate BMR
			var fatFreeMass = bodyWeightObj * (1 - fatPercentageObj / 100);
			var katchMcArdleBMR = 370 + (21.6 * fatFreeMass);

			//Assign PAL score
			var physicalActivityLevelScore = 0;
			if (sexObj == "Male") {
				if (physicalActivityLevelObj == "one") {
					physicalActivityLevelScore = 1;
				}
				if (physicalActivityLevelObj == "two") {
					physicalActivityLevelScore = 1.11;
				}
				if (physicalActivityLevelObj == "three") {
					physicalActivityLevelScore = 1.25;
				}
				if (physicalActivityLevelObj == "four") {
					physicalActivityLevelScore = 1.48;
				}
			}
			if (sexObj == "Female") {
				if (physicalActivityLevelObj == "one") {
					physicalActivityLevelScore = 1;
				}
				if (physicalActivityLevelObj == "two") {
					physicalActivityLevelScore = 1.12;
				}
				if (physicalActivityLevelObj == "three") {
					physicalActivityLevelScore = 1.27;
				}
				if (physicalActivityLevelObj == "four") {
					physicalActivityLevelScore = 1.45;
				}
			}

			//Assign TEF score
			var thermicEffectFoodScore = 0;
			if (thermicEffectFoodObj == "ten") {
				thermicEffectFoodScore = 1.1;
			}
			if (thermicEffectFoodObj == "fifteen") {
				thermicEffectFoodScore = 1.15;
			}
			if (thermicEffectFoodObj == "twenty") {
				thermicEffectFoodScore = 1.2;
			}
			if (thermicEffectFoodObj == "twentyfive") {
				thermicEffectFoodScore = 1.25;
			}

			//Calculate caloric maintenance intake
			var trainingDaysREE = (katchMcArdleBMR * physicalActivityLevelScore + (0.1 * bodyWeightObj * trainingTimeObj)) * thermicEffectFoodScore;

			var restdayREE = katchMcArdleBMR * physicalActivityLevelScore * thermicEffectFoodScore;

			var caloricEE = Math.round((trainingDaysObj / 7) * trainingDaysREE + ((7 - trainingDaysObj) / 7) * restdayREE);

			//Calculate caloric cut intake
			if (sexObj == 'Male' && fatPercentageObj <= 9 || sexObj == 'Female' && fatPercentageObj <= 14) {
				cutCaloricIntakeScoreLower = Math.round(0.925 * caloricEE);
				cutCaloricIntakeScoreUpper = Math.round(0.975 * caloricEE);

			}
			if (sexObj == 'Male' && fatPercentageObj > 9 && fatPercentageObj < 15 || sexObj == 'Female' && fatPercentageObj > 13 && fatPercentageObj < 24) {
				cutCaloricIntakeScoreLower = Math.round(0.8 * caloricEE);
				cutCaloricIntakeScoreUpper = Math.round(0.95 * caloricEE);
			}
			if (sexObj == 'Male' && fatPercentageObj > 14 && fatPercentageObj < 21 || sexObj == 'Female' && fatPercentageObj > 23 && fatPercentageObj < 33) {
				cutCaloricIntakeScoreLower = Math.round(0.6 * caloricEE);
				cutCaloricIntakeScoreUpper = Math.round(0.8 * caloricEE);
			}
			if (sexObj == 'Male' && fatPercentageObj > 20 && fatPercentageObj < 26 || sexObj == 'Female' && fatPercentageObj > 32 && fatPercentageObj < 39) {
				cutCaloricIntakeScoreLower = Math.round(0.5 * caloricEE);
				cutCaloricIntakeScoreUpper = Math.round(0.7 * caloricEE);
			}
			if (sexObj == 'Male' && fatPercentageObj > 26 || sexObj == 'Female' && fatPercentageObj > 39) {
				cutCaloricIntakeObj.innerHTML = 'Cut: As less as possible';
			}

			//Calculate caloric bulk intake
			if (sexObj == 'Male' && fatPercentageObj < 18 || sexObj == 'Female' && fatPercentageObj < 29) {
				if (experienceLevelObj == 'beginner') {
					//bulkCaloricIntakeObj.innerHTML = 'Bulk: between ' + Math.round(1.05 * caloricEE) + ' and ' + Math.round(1.15 * caloricEE);
					bulkCaloricIntakeScoreLower = Math.round(1.05 * caloricEE);
					bulkCaloricIntakeScoreUpper = Math.round(1.15 * caloricEE);
				}
				if (experienceLevelObj == 'intermediate') {
					//bulkCaloricIntakeObj.innerHTML = 'Bulk: between ' + Math.round(1.02 * caloricEE) + ' and ' + Math.round(1.07 * caloricEE);
					bulkCaloricIntakeScoreLower = Math.round(1.02 * caloricEE);
					bulkCaloricIntakeScoreUpper = Math.round(1.07 * caloricEE);
				}
				if (experienceLevelObj == 'advanced') {
					bulkCaloricIntakeObj.innerHTML = 'Bulk: ' + Math.round(1.01 * caloricEE) + ' - ' + Math.round(1.03 * caloricEE);
					bulkCaloricIntakeScoreLower = Math.round(1.01 * caloricEE);
					bulkCaloricIntakeScoreUpper = Math.round(1.03 * caloricEE);
				}
			}


			//Print caloric maintenance intake
			maintenanceLevelObj.innerHTML = '<span class="stateHeader">Maintenance</span><br> Calories: ' + caloricEE + ' kCal';

			//Print caloric cut intake
			cutCaloricIntakeObj.innerHTML = '<span class="stateHeader">Cut</span><br> Calories: ' + cutCaloricIntakeScoreLower + ' - ' + cutCaloricIntakeScoreUpper + ' kCal';

			//Print caloric bulk intake
			bulkCaloricIntakeObj.innerHTML = '<span class="stateHeader">Bulk</span><br> Calories: ' + bulkCaloricIntakeScoreLower + ' - ' + bulkCaloricIntakeScoreUpper + ' kCal';


			//Calculate maintenance macro's
			proteinIntakeScoreMaintenance = 1.8 * bodyWeightObj;
			if (sexObj == 'Male') {
				fatIntakeScoreMaintenance = ((0.3 * caloricEE) / 9);
			} else {
				fatIntakeScoreMaintenance = ((0.4 * caloricEE) / 9);
			}
			carbohydrateIntakeScoreMaintenance = (caloricEE - proteinIntakeScoreMaintenance * 4 - fatIntakeScoreMaintenance * 9) / 4;

			//Calculate cut macro's
			proteinIntakeScoreCut = 1.8 * bodyWeightObj;
			if (sexObj == 'Male') {
				fatIntakeScoreCutLower = ((0.3 * cutCaloricIntakeScoreLower) / 9);
				fatIntakeScoreCutUpper = ((0.3 * cutCaloricIntakeScoreUpper) / 9);
			} else {
				fatIntakeScoreCutLower = ((0.4 * cutCaloricIntakeScoreLower) / 9);
				fatIntakeScoreCutUpper = ((0.4 * cutCaloricIntakeScoreUpper) / 9);
			}
			carbohydrateIntakeScoreCutLower = (cutCaloricIntakeScoreLower - proteinIntakeScoreCut * 4 - fatIntakeScoreCutLower * 9) / 4;
			carbohydrateIntakeScoreCutUpper = (cutCaloricIntakeScoreUpper - proteinIntakeScoreCut * 4 - fatIntakeScoreCutUpper * 9) / 4;

			//Calculate bulk macro's
			proteinIntakeScoreBulk = 1.8 * bodyWeightObj;
			if (sexObj == 'Male') {
				fatIntakeScoreBulkLower = ((0.3 * bulkCaloricIntakeScoreLower) / 9);
				fatIntakeScoreBulkUpper = ((0.3 * bulkCaloricIntakeScoreUpper) / 9);
			} else {
				fatIntakeScoreBulkLower = ((0.4 * bulkCaloricIntakeScoreLower) / 9);
				fatIntakeScoreBulkUpper = ((0.4 * bulkCaloricIntakeScoreUpper) / 9);
			}
			carbohydrateIntakeScoreBulkLower = (bulkCaloricIntakeScoreLower - proteinIntakeScoreBulk * 4 - fatIntakeScoreBulkLower * 9) / 4;
			carbohydrateIntakeScoreBulkUpper = (bulkCaloricIntakeScoreUpper - proteinIntakeScoreBulk * 4 - fatIntakeScoreBulkUpper * 9) / 4;

			//Print maintenance macro's
			proteinIntakeMaintenanceObj.innerHTML = 'Protein: ' + Math.round(proteinIntakeScoreMaintenance) + ' gram';
			fatIntakeMaintenanceObj.innerHTML = 'Fat: ' + Math.round(fatIntakeScoreMaintenance) + ' gram';
			carbohydrateIntakeMaintenanceObj.innerHTML = 'Carbohydrates: ' + Math.round(carbohydrateIntakeScoreMaintenance)  + ' gram';

			//Print cut macro's
			proteinIntakeCutObj.innerHTML = 'Protein: ' + Math.round(proteinIntakeScoreCut) + ' gram';
			fatIntakeCutObj.innerHTML = 'Fat: ' + Math.round(fatIntakeScoreCutLower) +  ' - ' + Math.round(fatIntakeScoreCutUpper) + ' gram';
			carbohydrateIntakeCutObj.innerHTML = 'Carbohydrates: ' + Math.round(carbohydrateIntakeScoreCutLower)  + ' - ' + Math.round(carbohydrateIntakeScoreCutUpper) + ' gram';

			//Print bulk macro's
			proteinIntakeBulkObj.innerHTML = 'Protein: ' + Math.round(proteinIntakeScoreBulk) + ' gram';
			fatIntakeBulkObj.innerHTML = 'Fat: ' + Math.round(fatIntakeScoreBulkLower) +  ' - ' + Math.round(fatIntakeScoreBulkUpper) + ' gram';
			carbohydrateIntakeBulkObj.innerHTML = 'Carbohydrates: ' + Math.round(carbohydrateIntakeScoreBulkLower)  + ' - ' + Math.round(carbohydrateIntakeScoreBulkUpper) + ' gram';

			document.getElementById("input-form").style.display = 'none';
			document.getElementById("output-form").style.display = 'block';
		}

		function returnToHomePage() {
			document.getElementById("input-form").style.display = 'block';
			document.getElementById("output-form").style.display = 'none';
		}

		function submitForm() {
			var fnameObj = document.getElementById("fname").value;
			var mailObj = document.getElementById("mail").value;
			var subjectObj = document.getElementById("subject").value;

			//Error handling
			if(fnameObj.length === 0 || mailObj.length === 0 || subjectObj.length === 0) {
		        alert('Input forgotten');
		        return;
		    };

		    //Send feedback to Telegram
		    var feedback_message = "Name: " + fnameObj + "\nMail: " + mailObj + "\nSubject: " + subjectObj;
		    feedback_message = encodeURI(feedback_message);
		    var api_url = "https://api.telegram.org/bot"+telegram_token+"/sendMessage?chat_id="+chat_token+"&text="+feedback_message+"&disable_web_page_preview=true";
					
			$.ajax({
				url: api_url,
				datatype: 'json',
			}).done(function(reply){
				console.log(reply);
			});

		    //Show thank you message
		    document.getElementById("input-form").style.display = 'none';
			document.getElementById("output-form").style.display = 'block';
		}

		function showMenu() {
			var linksObj = document.getElementById("mobile-links");
			if (linksObj.style.display === 'block') {
				linksObj.style.display = "none";
			} else {
				linksObj.style.display = "block";
			}
		}