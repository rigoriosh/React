import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const useObservable = observable => {

    const [state, setState] = useState()

    useEffect(() => {
        console.log('useObservable')
        const sub = observable.subscribe(setState);
        return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return  state;
}

useObservable.propTypes = {
    observable: PropTypes.object.isRequired
}

export default useObservable
