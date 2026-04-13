# Studo - Schedule Generator

A full-stack web application that generates study schedules based on user tasks and lecture content. Studo helps students organize their workload by automatically creating prioritized study sessions and allocating them throughout the week.

## Features

- **Task Management**: Add, edit, and organize tasks with custom properties
- **Priority Levels**: Categorize tasks by priority (top, high, medium, low, none)
- **Automatic Study Generation**: Automatically creates study tasks based on lectures
- **Tasks Scheduling**: Generates a 7-day study schedule respecting time constraints
- **Time Constraints**: Respects day-end times and maximum study hours (default: end at 16:00)
- **Local Storage**: Persist your tasks and schedules in browser storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend

- **HTML5** - Page structure
- **CSS3** - Styling with responsive design
- **JavaScript (ES6+)** - Client-side logic
  - Task management
  - UI interactions
  - Local storage handling
  - Form validation
- **Jest** - Testing framework

### Backend

- **Python 3** - Server-side language
- **Flask** - Web framework
- **Scheduler Algorithm** - Priority-based task scheduling

## Project Structure

```
schedule-generator/
├── app.py                 # Flask application entry point
├── requirements.txt       # Python dependencies
├── package.json          # Node.js/npm configuration
├── README.md             # This file
├── src/
│   └── priority.py       # Scheduler class with scheduling algorithm
├── static/
│   ├── css/
│   │   └── main.css      # Stylesheet
│   ├── images/           # Static images and assets
│   └── js/
│       ├── main.js       # Main application logic
│       ├── AppStorage.js # Browser storage management
│       ├── Task.js       # Task class and utilities
│       ├── Valid.js      # Validation utilities
│       └── util.js       # Helper utilities
├── templates/
│   └── index.html        # Main HTML page
├── tests/
│   ├── frontend_logic.test.js    # Frontend tests
│   ├── test_priority.py          # Backend scheduler tests
│   └── test_scheduler_generation.py # Schedule generation tests
└── documentation/
    ├── class-diagram.drawio.xml  # Architecture diagrams
    └── documentation.md          # Additional documentation
```

## Installation

### Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the project directory:

```bash
cd schedule-generator
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Install JavaScript dependencies:

```bash
npm install
```

## Running the Application

### Start the Flask Development Server

```bash
python app.py
```

The application will be available at `http://localhost:5000`

### Run Tests

#### Frontend Tests

```bash
npm test
```

#### Backend Tests

```bash
python -m pytest tests/
```

## Usage

1. **Access the Application**: Open `http://localhost:5000` in your browser
2. **Add Tasks**: Click the "Add Task" button to create new tasks
3. **Set Properties**: Enter task name, type, priority, and description
4. **Generate Schedule**: Click "Generate Schedule" to create a 7-day study plan
5. **View Schedule**: The generated schedule displays tasks organized by day and time
6. **Modify & Save**: Edit tasks as needed - changes are automatically saved to local storage

## How It Works

### Scheduling Algorithm

The Scheduler class in `src/priority.py` uses the following logic:

1. **Priority Sorting**: Tasks are sorted by priority level (top → high → medium → low → none)
2. **Study Task Generation**: For each lecture, a corresponding study session is automatically created
3. **Time Slot Allocation**: Tasks are distributed across the 7-day week
4. **Constraint Enforcement**:
   - No tasks scheduled after 16:00 (default day-end time)
   - Study sessions cannot start after 21:00
   - 2-hour buffer maintained before day-end
5. **Schedule Optimization**: Tasks are balanced across available time slots

### Data Flow

```
User Input (HTML Form)
        ↓
JavaScript Validation (Valid.js)
        ↓
Flask API (/generate endpoint)
        ↓
Python Scheduler (priority.py)
        ↓
Generated Schedule (JSON)
        ↓
Frontend Rendering (main.js)
        ↓
Local Storage Persistence (AppStorage.js)
```

## Configuration

Default scheduling parameters in `src/priority.py`:

- **DEFAULT_DAY_END**: `16:00` - Default end time for the day
- **STUDY_LIMIT**: `21` - Hour after which no study sessions can start
- **MARGIN**: `2` - Hours of buffer before day end

Modify these constants to adjust scheduling behavior.

## Development

### Project Classes

- **Scheduler**: Core scheduling algorithm (Python)
- **Task**: Task representation and utilities (JavaScript)
- **AppStorage**: Browser local storage management (JavaScript)
- **Valid**: Form and data validation (JavaScript)
- **Util**: Utility functions for DOM manipulation (JavaScript)

### Adding Features

1. **New Task Properties**: Update the Task class and HTML form
2. **Modified Scheduling**: Update the Scheduler algorithm in `priority.py`
3. **UI Changes**: Modify `templates/index.html` and `static/css/main.css`
4. **Validation Rules**: Add to the Valid class in `static/js/Valid.js`

## Testing

The project includes comprehensive tests:

- **Frontend Logic Tests** (`tests/frontend_logic.test.js`): Tests for JavaScript utilities and Task management
- **Priority Tests** (`tests/test_priority.py`): Unit tests for scheduler algorithm
- **Schedule Generation Tests** (`tests/test_scheduler_generation.py`): Integration tests for schedule creation

Run all tests with:

```bash
npm test && python -m pytest tests/
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with ES6 support

## Performance Considerations

- Local storage persists data across sessions
- Schedule generation is optimized for up to 100+ tasks
- UI updates are debounced to prevent excessive re-rendering

## Future Enhancements

- Database integration for multi-user support
- User authentication and accounts
- Schedule export (PDF, iCal format)
- Recurring tasks and deadlines
- Calendar view integrations
- Mobile app version
- AI-powered task recommendations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions, please refer to the documentation in the `documentation/` folder or create an issue in the repository.

---

**Happy studying with Studo!** 📚
