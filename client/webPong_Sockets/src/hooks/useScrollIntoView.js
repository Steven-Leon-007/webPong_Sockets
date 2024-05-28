import { useEffect, useRef } from "react";

const useScrollIntoView = (selectedUserId, users, userRefs, boardRef) => {
    const prevUsersLength = useRef(users.length);

    useEffect(() => {
        if (selectedUserId && prevUsersLength.current !== users.length) {
            const userIndex = users.findIndex((user) => user.nickName === selectedUserId);

            if (userIndex !== -1 && userRefs.current[userIndex] && boardRef.current) {
                const containerLeft = boardRef.current.getBoundingClientRect().left;
                const elementLeft = userRefs.current[userIndex].getBoundingClientRect().left;
                const scrollLeft = boardRef.current.scrollLeft;
                const offset = elementLeft - containerLeft + scrollLeft;

                boardRef.current.scrollTo({
                    left: offset,
                    behavior: 'smooth'
                });
            }
        }
        prevUsersLength.current = users.length;
    }, [selectedUserId, users, userRefs, boardRef]);
};

export default useScrollIntoView;
