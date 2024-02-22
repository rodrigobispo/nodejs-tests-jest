INSERT INTO autores (nome, nacionalidade)
VALUES  ("JRR Tolkien", "sul-africano"),
        ("Ursula LeGuin", "estadunidense"),
        ("Machado de Assis", "brasileira");

INSERT INTO editoras (nome, cidade, email)
VALUES  ("Europa-América", "Lisboa", "e@e.com"),
        ("Morro Branco", "São Paulo", "m@m.com"),
        ("Aleph", "São Paulo", "al@al.com"),
        ("Ateliê", "São Paulo", "a@a.com");

INSERT INTO livros (titulo, paginas, autor_id, editora_id)
VALUES
   ("O Hobbit", 230, 1, 1),
   ("O Silmarillion", 400, 1, 1),
   ("O Silmarillion", 400, 1, 1),
   ("O Feiticeiro de Terramar", 450, 2, 2),
   ("Os Despossuídos", 300, 2, 3),
   ("Memórias Póstumas de Brás Cubas", 150, 3, 4);
