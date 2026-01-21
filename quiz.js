/* 
   🛡️ COPYRIGHT PROTECTION
   Ten kurs jest darmowy. Jeśli zapłaciłeś za niego - zostałeś oszukany.
   Licencja: CC BY-NC-SA 4.0 (Non-Commercial).
*/
console.log(
	"%c UWAGA! %c\n😊 Ten kurs jest DARMOWY i objęty licencją CC BY-NC-SA 4.0.\n⚠️ Zakaz sprzedaży i wykorzystania komercyjnego.\n👾 Jeśli widzisz ten kod w płatnym szkoleniu - zgłoś to autorce: https://github.com/AnnaWiktoria",
	"color: turquoise; font-size: 18px; font-weight: bold;",
	"color: grey; font-size: 14px; padding: 5px;",
);

/* KOD APLIKACJI */

let currentScore = 0;
const quizContainer = document.getElementById("quiz-container");
let totalQuestions = 0;

/* --- KONFIGURACJA PRZEJŚĆ (MAPA KURSU) --- */
const moduleEndings = {
	10: "exam_1.html",
	13: "exam_2.html",
	16: "exam_3.html",
	18: "exam_4.html",
	24: "exam_5.html",
	28: "exam_6.html",
};

const examTransitions = {
	"exam_1.html": "11.html",
	"exam_2.html": "14.html",
	"exam_3.html": "17.html",
	"exam_4.html": "19.html",
	"exam_5.html": "25.html",
	"exam_6.html": "final_exam.html",
};

function initQuiz() {
	if (
		typeof quizData === "undefined" ||
		!Array.isArray(quizData) ||
		quizData.length === 0
	) {
		if (quizContainer) {
			quizContainer.textContent = "Błąd inicjalizacji: Brak danych quizu.";
			quizContainer.style.color = "var(--danger)";
		}
		return;
	}

	totalQuestions = quizData.length;
	quizContainer.innerHTML = "";
	currentScore = 0;

	quizData.forEach((q, index) => {
		const card = document.createElement("div");
		card.className = "question-card";
		card.id = `q-card-${index}`;

		const header = document.createElement("h3");
		const promptSpan = document.createElement("span");
		promptSpan.style.color = "#555";
		promptSpan.textContent = "root@kali:~$ ";
		const commandText = document.createTextNode(`./check pytanie_${index + 1}`);

		header.appendChild(promptSpan);
		header.appendChild(commandText);

		if (q.type === "scenario") {
			const badge = document.createElement("span");
			badge.className = "scenario-badge";
			badge.textContent = "SCENARIUSZ";
			header.appendChild(document.createTextNode(" "));
			header.appendChild(badge);
		}
		card.appendChild(header);

		const questionText = document.createElement("p");
		questionText.style.fontSize = "1.1rem";
		questionText.style.marginBottom = "20px";
		questionText.textContent = q.question;
		card.appendChild(questionText);

		const optionsGrid = document.createElement("div");
		optionsGrid.className = "options-grid";

		q.options.forEach((optText, optIndex) => {
			const btn = document.createElement("div");
			btn.className = "option-btn";
			btn.textContent = optText;

			btn.addEventListener("click", function () {
				checkAnswer(index, optIndex, btn);
			});

			optionsGrid.appendChild(btn);
		});
		card.appendChild(optionsGrid);

		const explanationDiv = document.createElement("div");
		explanationDiv.className = "explanation";
		explanationDiv.id = `expl-${index}`;

		const systemResponse = document.createElement("strong");
		systemResponse.textContent = "> SYSTEM RESPONSE:";
		const breakLine = document.createElement("br");
		const explText = document.createElement("span");
		explText.innerHTML = q.explanation;

		explanationDiv.appendChild(systemResponse);
		explanationDiv.appendChild(breakLine);
		explanationDiv.appendChild(explText);

		card.appendChild(explanationDiv);
		quizContainer.appendChild(card);
	});
}

function checkAnswer(qIndex, optIndex, btnElement) {
	const parentGrid = btnElement.parentElement;

	if (parentGrid.classList.contains("answered")) return;

	parentGrid.classList.add("answered");
	const question = quizData[qIndex];
	const explanationDiv = document.getElementById(`expl-${qIndex}`);

	if (optIndex === question.correct) {
		btnElement.classList.add("correct");
		currentScore++;
	} else {
		btnElement.classList.add("wrong");
		const allOptions = parentGrid.children;
		if (allOptions[question.correct]) {
			allOptions[question.correct].classList.add("correct");
		}
	}

	explanationDiv.style.display = "block";

	const totalAnswered = document.querySelectorAll(
		".options-grid.answered",
	).length;
	if (totalAnswered === totalQuestions) {
		setTimeout(showFinalResults, 500);
	}
}

function showFinalResults() {
	const percentage = Math.round((currentScore / totalQuestions) * 100);
	const passed = percentage >= 75;

	// --- ZAPIS POSTĘPU (DEBUG & FIX) ---
	if (passed) {
		try {
			// Pobieramy samą nazwę pliku, np. "1.html"
			// decodeURIComponent obsługuje spacje i znaki specjalne w URL
			const currentFilename = decodeURIComponent(
				window.location.pathname.split("/").pop(),
			);
			const storageKey = "mission_complete_" + currentFilename;

			localStorage.setItem(storageKey, "true");
			console.log(`✅ ZAPISANO POSTĘP: ${storageKey} = true`); // Sprawdź w konsoli F12!
		} catch (e) {
			console.error("Błąd zapisu localStorage:", e);
		}
	}
	// ----------------------------------

	const resultContainer = document.createElement("div");
	resultContainer.className = "quiz-result-container";
	resultContainer.id = "final-result";

	const label = document.createElement("div");
	label.style.fontFamily = "var(--font-mono)";
	label.style.color = "#888";
	label.style.marginBottom = "10px";
	label.textContent = "WYNIK KOŃCOWY";
	resultContainer.appendChild(label);

	const scoreDiv = document.createElement("div");
	scoreDiv.className = `result-score ${passed ? "pass" : "fail"}`;
	scoreDiv.textContent = `${percentage}%`;
	resultContainer.appendChild(scoreDiv);

	const msgDiv = document.createElement("div");
	msgDiv.className = "result-msg";
	msgDiv.innerHTML = passed
		? "SYSTEM UNLOCKED! 🔓 <br>Gratulacje, wiedza zweryfikowana."
		: "ACCESS DENIED 🔒 <br>Musisz uzyskać min. 75% aby przejść dalej.";
	resultContainer.appendChild(msgDiv);

	// --- PRZYCISKI WYNIKU (UPROSZCZONE) ---
	if (passed) {
		const path = window.location.pathname;
		const filename = path.split("/").pop();
		const currentNum = parseInt(filename);

		let nextTarget = "";
		let btnText = "";

		if (examTransitions[filename]) {
			nextTarget = examTransitions[filename];
			btnText = "ODBLOKUJ KOLEJNY MODUŁ >>";
		} else if (moduleEndings[currentNum]) {
			nextTarget = moduleEndings[currentNum];
			btnText = "⚔️ PODEJMIJ WYZWANIE (EGZAMIN) >>";
		} else if (!isNaN(currentNum)) {
			nextTarget = currentNum + 1 + ".html";
			btnText = `NASTĘPNA LEKCJA [${currentNum + 1}] >>`;
		}

		if (nextTarget) {
			const nextLink = document.createElement("a");
			nextLink.href = nextTarget;
			nextLink.className = "btn btn-primary";
			nextLink.textContent = btnText;

			if (nextTarget.includes("exam")) {
				nextLink.style.backgroundColor = "#ff0055";
				nextLink.style.color = "#fff";
			}

			resultContainer.appendChild(nextLink);
			// USUNIĘTO NADMIAROWY PRZYCISK HOME
		}
	} else {
		const retryBtn = document.createElement("button");
		retryBtn.className = "btn btn-danger";
		retryBtn.textContent = "↻ SPRÓBUJ PONOWNIE";
		retryBtn.onclick = resetQuiz;
		resultContainer.appendChild(retryBtn);
		// USUNIĘTO NADMIAROWY PRZYCISK HOME
	}

	quizContainer.appendChild(resultContainer);
	resultContainer.scrollIntoView({ behavior: "smooth" });
}

function resetQuiz() {
	initQuiz();
	const quizSection = document.getElementById("quiz-section");
	if (quizSection) {
		window.scrollTo({ top: quizSection.offsetTop, behavior: "smooth" });
	}
}

/* --- AUTOMATYCZNA NAWIGACJA (DÓŁ STRONY) --- */
document.addEventListener("DOMContentLoaded", function () {
	const path = window.location.pathname;
	const page = path.split("/").pop();
	const currentNum = parseInt(page);

	// Obsługa Egzaminów (tylko powrót)
	if (page.includes("exam") || isNaN(currentNum)) {
		if (page.includes("exam")) {
			const navContainer = document.createElement("div");
			navContainer.className = "lesson-nav";
			navContainer.style.justifyContent = "center";
			navContainer.innerHTML = `<a href="index.html" class="nav-btn home">🏠 WRÓĆ DO BAZY</a>`;
			const footer = document.querySelector("footer");
			if (footer) footer.parentNode.insertBefore(navContainer, footer);
		}
		return;
	}

	const navContainer = document.createElement("div");
	navContainer.className = "lesson-nav";

	// --- PRZYCISK WSTECZ ---
	if (currentNum > 1) {
		navContainer.innerHTML += `<a href="${currentNum - 1}.html" class="nav-btn">← LEKCJA ${currentNum - 1}</a>`;
	} else {
		navContainer.innerHTML += `<div class="nav-btn hidden"></div>`;
	}

	// --- PRZYCISK HOME ---
	navContainer.innerHTML += `<a href="index.html" class="nav-btn home">🏠 BAZA</a>`;

	// --- PRZYCISK DALEJ (Z LOGIKĄ EGZAMINÓW) ---
	if (moduleEndings[currentNum]) {
		navContainer.innerHTML += `<a href="${moduleEndings[currentNum]}" class="nav-btn" style="border-color:var(--danger); color:var(--danger)">⚔️ EGZAMIN →</a>`;
	} else if (currentNum < 28) {
		navContainer.innerHTML += `<a href="${currentNum + 1}.html" class="nav-btn">LEKCJA ${currentNum + 1} →</a>`;
	} else {
		navContainer.innerHTML += `<a href="final_exam.html" class="nav-btn" style="border-color:#fff; color:#fff">🏆 FINAŁ →</a>`;
	}

	const footer = document.querySelector("footer");
	if (footer) {
		footer.parentNode.insertBefore(navContainer, footer);
	}
});

// Inicjalizacja po załadowaniu
window.onload = initQuiz;
