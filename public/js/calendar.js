class Calendar {
  constructor() {
    this.currentDate = new Date();
    this.events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    this.init();
  }

  init() {
    this.renderCalendar();
    this.setupEventListeners();
    this.renderEvents();
  }

  renderCalendar() {
    const calendar = document.getElementById('calendar');
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // カレンダーのヘッダーを更新
    document.querySelector('h2').textContent = `${year}年 ${month + 1}月`;

    // 月の最初の日と最後の日を取得
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();

    // カレンダーの日付セルをクリア
    const dateCells = calendar.querySelectorAll('.date-cell');
    dateCells.forEach(cell => cell.remove());

    // 日付セルを生成
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'date-cell';
      calendar.appendChild(emptyCell);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dateCell = document.createElement('div');
      dateCell.className = 'date-cell p-2 border border-gray-200 min-h-[100px]';
      dateCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      
      const dateNumber = document.createElement('div');
      dateNumber.className = 'text-right font-bold';
      dateNumber.textContent = i;
      dateCell.appendChild(dateNumber);

      // 今日の日付をハイライト
      if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
        dateCell.classList.add('bg-blue-100');
      }

      calendar.appendChild(dateCell);
    }
  }

  setupEventListeners() {
    // 月の移動ボタン
    document.getElementById('prevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
      this.renderEvents();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
      this.renderEvents();
    });

    // 予定追加フォーム
    document.getElementById('eventForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('eventTitle').value;
      const date = document.getElementById('eventDate').value;
      const memo = document.getElementById('eventMemo').value;

      if (title && date) {
        this.addEvent({
          id: Date.now(),
          title,
          date,
          memo
        });
        e.target.reset();
      }
    });
  }

  addEvent(event) {
    this.events.push(event);
    localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    this.renderEvents();
  }

  deleteEvent(eventId) {
    this.events = this.events.filter(event => event.id !== eventId);
    localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    this.renderEvents();
  }

  renderEvents() {
    // 日付セルに予定を表示
    const dateCells = document.querySelectorAll('.date-cell');
    dateCells.forEach(cell => {
      const date = cell.dataset.date;
      if (!date) return;

      const eventsForDate = this.events.filter(event => event.date === date);
      const eventContainer = cell.querySelector('.events-container') || document.createElement('div');
      eventContainer.className = 'events-container mt-2 space-y-1';
      eventContainer.innerHTML = '';

      eventsForDate.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'bg-blue-500 text-white text-sm p-1 rounded cursor-pointer';
        eventElement.textContent = event.title;
        eventElement.addEventListener('click', () => this.showEventDetails(event));
        eventContainer.appendChild(eventElement);
      });

      if (!cell.querySelector('.events-container')) {
        cell.appendChild(eventContainer);
      }
    });

    // 予定一覧を更新
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    this.events.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.className = 'bg-gray-50 p-4 rounded-lg';
      eventElement.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-bold">${event.title}</h4>
            <p class="text-sm text-gray-600">${event.date}</p>
            ${event.memo ? `<p class="mt-2">${event.memo}</p>` : ''}
          </div>
          <button class="text-red-500 hover:text-red-700" onclick="calendar.deleteEvent(${event.id})">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
      eventList.appendChild(eventElement);
    });

    // Lucideアイコンを更新
    lucide.createIcons();
  }

  showEventDetails(event) {
    // モーダルで予定の詳細を表示
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">${event.title}</h3>
        <p class="text-gray-600 mb-2">日付: ${event.date}</p>
        ${event.memo ? `<p class="mb-4">${event.memo}</p>` : ''}
        <button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onclick="this.closest('.fixed').remove()">
          閉じる
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

// カレンダーインスタンスを作成
const calendar = new Calendar(); 