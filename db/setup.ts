// Users

// CREATE TABLE chatusers (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     salt VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW()
// );

// Chats

// CREATE TABLE chats (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     title VARCHAR(255) NOT NULL,
//     userid UUID NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (userid) REFERENCES chatusers(id) ON DELETE CASCADE
// );

// Messages

// CREATE TABLE messages (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     userid UUID NOT NULL,
//     chat UUID NOT NULL,
//     content TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     role VARCHAR(50) NOT NULL DEFAULT 'user',
//     FOREIGN KEY (chat) REFERENCES chats(id) ON DELETE CASCADE,
//     CHECK (role IN ('user', 'assistant', 'tool'))
// );
