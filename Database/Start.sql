INSERT INTO User (username, email, phone_number, notification_type_opt_out)
VALUES
    ('João cavalcanti', 'joao.cavalcanti@example.com', '+5511923456789', ARRAY[]),
    ('Ronaldo suares', 'ronaldo.suares@example.com', '+5511987654321', ARRAY['WEB']),
    ('Luis pedro', 'luis.pedro@example.com', '+5511955555555', ARRAY['WEB']),
    ('Guilherme santos', 'guilherme.santos@example.com', '+5511955555555', ARRAY['WEB']),
    ('Maria romão', 'maria.romao@example.com', '+5511999999999', ARRAY[]);