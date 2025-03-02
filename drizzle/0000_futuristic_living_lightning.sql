CREATE TABLE "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_code" varchar(10) NOT NULL,
	CONSTRAINT "urls_short_code_unique" UNIQUE("short_code")
);
