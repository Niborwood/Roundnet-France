-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255),
    "description" VARCHAR(255),
    "mail" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "club_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "contact_id" INTEGER,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255),
    "mail" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "rfid" VARCHAR(15),
    "club_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Club_mail_key" ON "Club"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "User_rfid_key" ON "User"("rfid");

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "fk_club_id" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

