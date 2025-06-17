--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Debian 14.18-1.pgdg120+1)
-- Dumped by pg_dump version 14.18 (Debian 14.18-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    phone character varying(20),
    document_number character varying(50),
    address text,
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.customers OWNER TO admin;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO admin;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(100) NOT NULL,
    barcode character varying(50) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone,
    updated_at timestamp without time zone,
    quantity integer DEFAULT 0
);


ALTER TABLE public.products OWNER TO admin;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_product_id_seq OWNER TO admin;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: stock_entries; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.stock_entries (
    entry_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    entry_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT stock_entries_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.stock_entries OWNER TO admin;

--
-- Name: stock_entries_entry_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.stock_entries_entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_entries_entry_id_seq OWNER TO admin;

--
-- Name: stock_entries_entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.stock_entries_entry_id_seq OWNED BY public.stock_entries.entry_id;


--
-- Name: stock_exits; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.stock_exits (
    exit_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    exit_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT stock_exits_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.stock_exits OWNER TO admin;

--
-- Name: stock_exits_exit_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.stock_exits_exit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_exits_exit_id_seq OWNER TO admin;

--
-- Name: stock_exits_exit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.stock_exits_exit_id_seq OWNED BY public.stock_exits.exit_id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    company_name character varying(150) NOT NULL,
    contact_name character varying(100),
    email character varying(150),
    phone character varying(20),
    address text,
    city character varying(100),
    state character varying(100),
    zip_code character varying(20),
    country character varying(100),
    tax_id character varying(50),
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.suppliers OWNER TO admin;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suppliers_id_seq OWNER TO admin;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    phone character varying(20),
    password character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    deleted_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Name: stock_entries entry_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stock_entries ALTER COLUMN entry_id SET DEFAULT nextval('public.stock_entries_entry_id_seq'::regclass);


--
-- Name: stock_exits exit_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stock_exits ALTER COLUMN exit_id SET DEFAULT nextval('public.stock_exits_exit_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.customers (id, first_name, last_name, email, phone, document_number, address, is_active, deleted_at, created_at, updated_at) FROM stdin;
73	ssssssssssss	ssssssssssssssssssssss	sssssssssssssssssssss@gmail.com	ssssssssssss	sssssssssssssss	sssssssssssssssssss	t	2025-06-04 23:38:02.295253	2025-06-04 23:24:01.016981	2025-06-04 23:24:01.016981
74	SDSDSDSDS	BB	000@GMAIL.COM	(11) 11111-1111	FFFF	FFFF	t	2025-06-10 22:41:25.370989	2025-06-04 23:38:26.770008	2025-06-10 22:41:15.514202
75	paulo	cergio	DD@GMAIL.COM	(11) 11111-1111	mg16217173	RUA DINIS DIAS 510	t	\N	2025-06-10 22:41:58.540941	2025-06-10 22:41:58.540941
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.products (product_id, product_name, barcode, description, created_at, deleted_at, updated_at, quantity) FROM stdin;
7	Monitor 24'' IPS	789123456003	Monitor Full HD com borda fina e entrada HDMI	2025-06-07 17:54:26.849794	\N	\N	0
5	Teclado Mecânico RGB	789123456001	Teclado com switches azuis e iluminação RGB	2025-06-07 17:54:07.505787	2025-06-07 18:33:23.641467	\N	0
6	Mouse Sem Fio	789123456002	Mouse óptico 1600dpi com conexão USB	2025-06-07 17:54:23.216477	2025-06-07 18:35:28.399837	\N	0
8	OlaMundo	123456	olaaa	2025-06-07 17:54:31.34632	\N	2025-06-07 18:36:35.605168	0
10	fdfdfdfdfdfdfdf	fdfdfd	sfdfdfdfd	2025-06-08 12:57:12.673396	2025-06-08 12:57:40.085602	2025-06-08 12:57:31.756979	0
11	stringDSDSDS	stringDSDSDS	stringDSDSDS	2025-06-08 13:21:31.118562	\N	\N	504
\.


--
-- Data for Name: stock_entries; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.stock_entries (entry_id, product_id, quantity, entry_date) FROM stdin;
10	11	10	2025-06-08 14:11:58.736509
11	11	500	2025-06-10 23:16:28.485436
\.


--
-- Data for Name: stock_exits; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.stock_exits (exit_id, product_id, quantity, exit_date) FROM stdin;
8	11	1	2025-06-08 14:12:24.942717
9	11	5	2025-06-10 23:15:55.907474
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.suppliers (id, company_name, contact_name, email, phone, address, city, state, zip_code, country, tax_id, is_active, created_at, updated_at, deleted_at) FROM stdin;
3	TechSolutions Ltda	Carlos Silva	carlosa@techsolutions.com	+55 11 98765-4321	Av. Paulista, 1000	São Paulo	SP	01310-100	Brasil	12.345.678/0001-99	\N	2025-06-09 00:09:08.997382	2025-06-09 00:09:08.997382	2025-06-09 22:10:07.944645
13	BANCO DO BRASIL SA	PAulo Cergio	secex@bb.com.br	34939002	SAUN QUADRA 5 BLOCO B TORRE I, II, III, SN	Brasília	DF	70040912	Brasil	00.000.000/0001-91	t	2025-06-10 22:31:24.554464	2025-06-10 22:31:24.554464	\N
16	BANCO DO BRASIL SA	pauoc	secexd@bb.com.br	34939002	SAUN QUADRA 5 BLOCO B TORRE I, II, III, SN	Brasília	DF	70040912	Brasil	101.445.506-52	t	2025-06-10 22:32:02.776459	2025-06-10 22:32:02.776459	\N
23	NU PAGAMENTOS S.A. - INSTITUICAO DE PAGAMENTO	EEE	dsdsd@gmail.com	11111111	RUA CAPOTE VALENTE, 120	SÃO PAULO	SP	05409000	BRASIL	18.236.120/0001-58	t	2025-06-10 23:41:23.57862	2025-06-10 23:41:23.57862	\N
24	BRASFROTAS LOCACAO DE VEICULOS S.A.	PAulo	contato@brasfrotas.com.br	30695577	AFONSO BRAZ, 644	São Paulo	SP	04511001	Brasil	09.532.523/0001-53	t	2025-06-14 17:35:19.150419	2025-06-14 17:35:19.150419	\N
4	000000000	000	0000@GMAIL.COM	DDDDDDD	DDDD	3333333333	3333	333	3333	33333333333	t	2025-06-09 22:30:13.500053	2025-06-09 22:30:13.500053	2025-06-14 18:02:01.062621
8	BANCO DO BRASIL SA	PAULO CERGIO	TESTE@GMAIL.COM	1111111111111111	SAUN QUADRA 5 BLOCO B TORRE I, II, III, SN	Brasília	DF	70040912	Brasil	00.000.000/0001-91	t	2025-06-09 23:54:55.048174	2025-06-09 23:54:55.048174	2025-06-14 18:02:55.715218
12	NU PAGAMENTOS S.A. - INSTITUICAO DE PAGAMENTO	eeeeeeeeeeeee	dd@gmail.com	eeeeeeeeeee	Rua Capote Valente, 120	São Paulo	SP	05409000	Brasil	18.236.120/0001-58	t	2025-06-10 21:48:56.699347	2025-06-10 21:48:56.699347	2025-06-14 18:03:01.531767
18	DDSDSDS	FDFF	WWsecex@bb.com.br	222222	SAASASA	SASAS	ASASAS	ASASASA	ASASASA	111.111.111-11	t	2025-06-10 22:45:08.179423	2025-06-10 22:45:08.179423	2025-06-14 18:03:06.227347
6	Banco do Brasil	Banco do Brasil	Banco@gmail.com	1111	11ererer	rererer	ererere	rere	rererer	erererere	t	2025-06-09 22:43:01.090293	2025-06-09 22:43:01.090293	2025-06-14 18:03:51.416726
7	BANCO DO BRASIL SA	Paulo aaaaaaaaaaaaaaaaaaaaaaaaaaaa	ee@gmail.com	00.000.000	SAUN QUADRA 5 BLOCO B TORRE I, II, III, SN	Brasília	DF	70040912	Brasil	00.000.000/0001-91	t	2025-06-09 22:55:56.458105	2025-06-14 18:04:07.527997	\N
5	sss										t	2025-06-09 22:40:29.460139	2025-06-09 22:40:29.460139	2025-06-14 18:08:43.953151
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, first_name, last_name, email, created_at, phone, password, is_active, deleted_at, updated_at) FROM stdin;
82			JUNIORCERGIO@GMAIL.COM	2025-06-04 21:58:14.709016			t	2025-06-04 22:50:38.034385	\N
83	PAULO	CERGIO	FDFDFD@GMAIL.COM	2025-06-04 22:50:18.341665	(22) 22222-2222	222222222222222222	t	2025-06-04 23:04:19.315102	\N
84	Paulo	CERGIO	PC@GMAIL.COM	2025-06-04 23:04:37.303776	(11) 11111-1111	111111111	t	2025-06-04 23:31:42.967049	2025-06-04 23:28:20.282466
85	PAULO	CERGIO	PCCC@GMAIL.COM	2025-06-04 23:42:48.45287	(33) 33333-3333	11111111111111111111111	t	\N	2025-06-04 23:42:56.48891
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.customers_id_seq', 76, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.products_product_id_seq', 11, true);


--
-- Name: stock_entries_entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.stock_entries_entry_id_seq', 11, true);


--
-- Name: stock_exits_exit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.stock_exits_exit_id_seq', 9, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 85, true);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: products products_barcode_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_barcode_key UNIQUE (barcode);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: stock_entries stock_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stock_entries
    ADD CONSTRAINT stock_entries_pkey PRIMARY KEY (entry_id);


--
-- Name: stock_exits stock_exits_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stock_exits
    ADD CONSTRAINT stock_exits_pkey PRIMARY KEY (exit_id);


--
-- Name: suppliers suppliers_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_email_key UNIQUE (email);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: stock_entries stock_entries_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stock_entries
    ADD CONSTRAINT stock_entries_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: stock_exits stock_exits_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.stock_exits
    ADD CONSTRAINT stock_exits_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- PostgreSQL database dump complete
--

