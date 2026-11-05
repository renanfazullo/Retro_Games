drop database if exists db_retrogames;
create database db_retrogames;
use db_retrogames;

create table jogos(
    id int not null auto_increment primary key,
    titulo varchar(150) not null,
    desenvolvedora varchar(150) not null,
    genero varchar(100) not null, 
    plataforma varchar(100) not null, 
    imagem_url varchar(500) not null, 
    preco decimal(10,2) not null
);

insert into jogos(titulo, desenvolvedora, genero, plataforma, imagem_url, preco)
values('Super Mario World', 'Nintendo', 'Plataforma', 'SNES', 'https://upload.wikimedia.org/wikipedia/pt/0/06/Super-Mario-World.jpg?utm_source=pt.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled', 150.00);
insert into jogos(titulo, desenvolvedora, genero, plataforma, imagem_url, preco)
values('Sonic the Hedgehog', 'Sonic Team', 'Plataforma', 'Mega Drive', 'https://images.openai.com/static-rsc-4/M-vtFoPUtSxXuytXfxVeV_ShN-aXPlDZi-paYF56qqYYMVzRUlvRektq3vyDMwgZmDCFiUSMqzXoFG3HlSPkQ1KTuDGgNpUgxIe5G2oPladn9F2TWmU-2TCqcihQlOdw9uguio2jelnZkTHToD1UyYAeQK-5pgpdwbhTcny_LXh3D_40iZB2x-7zgPnfRY8v?purpose=fullsize', 130.00);
insert into jogos(titulo, desenvolvedora, genero, plataforma, imagem_url, preco)
values('Street Fighter II Turbo', 'Capcom', 'Luta', 'SNES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSayzmP0IYYp8ce0l7nFHJ80l9FD3MwmSX45IC00crRkLek9017XGu9Wq_F&s=10', 250.00);

select * from jogos;