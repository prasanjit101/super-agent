**Tables:**

1.  **Users:**

2.  **Tasks:**
    *   `task_id` (INTEGER PRIMARY KEY AUTOINCREMENT): Unique identifier for each task.
    *   `user_id` (INTEGER NOT NULL, FOREIGN KEY referencing Users.user_id): ID of the user who created the task.
    *   `task_name` (TEXT NOT NULL): Name or description of the task.
    *   `task_definition` (TEXT NOT NULL): JSON or other structured format defining the automation steps (e.g., navigation URLs, form fields, data extraction rules).
    *   `status` (TEXT DEFAULT 'pending'): Current status of the task (e.g., 'pending', 'running', 'completed', 'failed').
    *   `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP): Timestamp of task creation.
    *   `scheduled_at` (DATETIME): Timestamp for scheduled task execution (NULL if not scheduled).
  
3. **BrowserSessions:**
    * `session_id` (INTEGER PRIMARY KEY AUTOINCREMENT): Unique identifier for each browser session.
    * `user_id` (INTEGER NOT NULL, FOREIGN KEY referencing Users.user_id): ID of the user who owns the session.
    * `start_time` (DATETIME): Timestamp when the session started.
    * `end_time` (DATETIME): Timestamp when the session ended.
    * `browser_instance_id` (TEXT): Identifier for the actual cloud browser instance (e.g., container ID).
    * `metadata` (TEXT): Additional metadata associated with the session.
    * `stream_url` (TEXT): URL for accessing the session's stream.