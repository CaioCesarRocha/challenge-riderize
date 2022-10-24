import { prisma } from "../../Prisma/prismaClient";

interface IPropsCheckLimit{
    id: string,
    limit: number,
}

export const checkLimitParticipants = async (props: IPropsCheckLimit) => {
    const { id, limit } = props;
    try{
        const participants = await prisma.usersOnRide.findMany({
            where: { ride_id: id}
        })
        const currentNumber = participants.length + 1;
        if(currentNumber > limit) throw new Error('Exceeded number of participants')
        return null;
    }catch(err){
        if(err instanceof Error) throw new Error(err.message)
    }
}