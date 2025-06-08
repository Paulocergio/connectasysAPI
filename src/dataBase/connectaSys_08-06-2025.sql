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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.customers (id, first_name, last_name, email, phone, document_number, address, is_active, deleted_at, created_at, updated_at) FROM stdin;
73	ssssssssssss	ssssssssssssssssssssss	sssssssssssssssssssss@gmail.com	ssssssssssss	sssssssssssssss	sssssssssssssssssss	t	2025-06-04 23:38:02.295253	2025-06-04 23:24:01.016981	2025-06-04 23:24:01.016981
74	ewewewewew	BB	000@GMAIL.COM	(11) 11111-1111	000000000000000000000000000	00000000000000	t	\N	2025-06-04 23:38:26.770008	2025-06-04 23:59:25.508189
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
11	stringDSDSDS	stringDSDSDS	stringDSDSDS	2025-06-08 13:21:31.118562	\N	\N	9
\.


--
-- Data for Name: stock_entries; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.stock_entries (entry_id, product_id, quantity, entry_date) FROM stdin;
10	11	10	2025-06-08 14:11:58.736509
\.


--
-- Data for Name: stock_exits; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.stock_exits (exit_id, product_id, quantity, exit_date) FROM stdin;
8	11	1	2025-06-08 14:12:24.942717
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

SELECT pg_catalog.setval('public.customers_id_seq', 74, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.products_product_id_seq', 11, true);


--
-- Name: stock_entries_entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.stock_entries_entry_id_seq', 10, true);


--
-- Name: stock_exits_exit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.stock_exits_exit_id_seq', 8, true);


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

