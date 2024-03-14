import { useEffect, useRef, useState } from "react";

const useStream = () => {
    const [stream, setStream] = useState<null | MediaStream | number>(null)
    const isStreamSet = useRef(false);

    useEffect(
        () => {
            if (isStreamSet.current) return;
            isStreamSet.current = true;
            (async () => {
                try {
                    const myStream = await navigator.mediaDevices.getUserMedia(
                        {
                            audio : true,
                            video : true
                        }
                    )
                    setStream(myStream);
                }
                catch (error) {
                    setStream(-1);
                }
            })()
        },
        []
    )

    return stream;
}

export default useStream;