import sqlite3


def ensure_column(cursor, table, column, definition):
    cursor.execute(f'PRAGMA table_info("{table}")')
    columns = {row[1] for row in cursor.fetchall()}
    if column not in columns:
        cursor.execute(f'ALTER TABLE "{table}" ADD COLUMN "{column}" {definition}')


conn = sqlite3.connect("dev.db")
cursor = conn.cursor()

cursor.executescript(
    """
CREATE TABLE IF NOT EXISTS "Usuario" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nome" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "role" TEXT NOT NULL DEFAULT 'admin',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Cliente" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nome" TEXT NOT NULL,
  "setor" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active',
  "contato" TEXT NOT NULL DEFAULT '',
  "receitaMensal" INTEGER NOT NULL DEFAULT 0,
  "score" INTEGER NOT NULL DEFAULT 80,
  "desde" TEXT NOT NULL DEFAULT '',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "MemoriaMarca" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "clienteId" TEXT NOT NULL UNIQUE,
  "posicionamento" TEXT NOT NULL DEFAULT '',
  "tomDeVoz" TEXT NOT NULL DEFAULT '',
  "palavrasChave" TEXT NOT NULL DEFAULT '',
  "temasPrioritarios" TEXT NOT NULL DEFAULT '',
  "assuntosSensiveis" TEXT NOT NULL DEFAULT '',
  "restricoes" TEXT NOT NULL DEFAULT '',
  "briefingBase" TEXT NOT NULL DEFAULT '',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "TemplateConteudo" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nome" TEXT NOT NULL,
  "nicho" TEXT NOT NULL,
  "formato" TEXT NOT NULL,
  "objetivo" TEXT NOT NULL,
  "promptBase" TEXT NOT NULL,
  "campos" TEXT NOT NULL DEFAULT '',
  "ativo" BOOLEAN NOT NULL DEFAULT 1,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "EventoEditorial" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "clienteId" TEXT,
  "titulo" TEXT NOT NULL,
  "canal" TEXT NOT NULL,
  "tipo" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'planned',
  "data" DATETIME NOT NULL,
  "briefing" TEXT NOT NULL DEFAULT '',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Publicacao" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "clienteId" TEXT,
  "conteudoId" TEXT,
  "canal" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "scheduledAt" DATETIME,
  "publishedAt" DATETIME,
  "externalPostId" TEXT,
  "mensagem" TEXT NOT NULL DEFAULT '',
  "mediaUrl" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY ("conteudoId") REFERENCES "Conteudo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "MetricaCliente" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "clienteId" TEXT NOT NULL,
  "periodo" TEXT NOT NULL,
  "alcance" INTEGER NOT NULL DEFAULT 0,
  "engajamento" INTEGER NOT NULL DEFAULT 0,
  "sentimento" INTEGER NOT NULL DEFAULT 0,
  "risco" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "MetricaConteudo" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "conteudoId" TEXT NOT NULL,
  "canal" TEXT NOT NULL,
  "alcance" INTEGER NOT NULL DEFAULT 0,
  "cliques" INTEGER NOT NULL DEFAULT 0,
  "engajamento" INTEGER NOT NULL DEFAULT 0,
  "sentimento" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("conteudoId") REFERENCES "Conteudo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
"""
)

ensure_column(cursor, "Conteudo", "clienteId", "TEXT")

conn.commit()
conn.close()
print("Banco local atualizado.")
