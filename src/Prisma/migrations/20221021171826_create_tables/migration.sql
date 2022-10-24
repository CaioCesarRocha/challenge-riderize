-- CreateTable
CREATE TABLE "ride" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_date_registration" TIMESTAMP(3) NOT NULL,
    "end_date_registration" TIMESTAMP(3) NOT NULL,
    "additional_information" VARCHAR(250),
    "start_place" TEXT NOT NULL,
    "participants_limit" INTEGER,
    "creator_id" TEXT NOT NULL,

    CONSTRAINT "ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersOnRide" (
    "user_id" TEXT NOT NULL,
    "ride_id" TEXT NOT NULL,
    "subscription_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usersOnRide_pkey" PRIMARY KEY ("user_id","ride_id")
);

-- AddForeignKey
ALTER TABLE "ride" ADD CONSTRAINT "ride_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnRide" ADD CONSTRAINT "usersOnRide_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnRide" ADD CONSTRAINT "usersOnRide_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
