import { useEffect } from "react";

const useScrollIntoView = (selectedUserId, users, userRefs) => {
    useEffect(() => {
        if (selectedUserId) {
            const userIndex = users.findIndex((user) => user.nickName === selectedUserId);
            if (userIndex !== -1 && userRefs.current[userIndex]) {
                userRefs.current[userIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [selectedUserId, users, userRefs]);
};


export default useScrollIntoView;