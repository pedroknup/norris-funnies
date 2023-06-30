import { renderHook, act } from '@testing-library/react-hooks'
import useChuckNorrisJokes from '@hooks/useChuckNorrisJokes'
import fetchChuckNorrisJokes from '@services/chuck-norris-service'

jest.mock('@services/chuck-norris-service')

const mockedFetchChuckNorrisJoke = jest.fn()

describe('useChuckNorrisJokes', () => {
    beforeEach(() => {
        mockedFetchChuckNorrisJoke.mockClear()
        mockedFetchChuckNorrisJoke.mockResolvedValue(null)
        localStorage.clear()
    })

    jest.mock('@services/chuck-norris-service', () => {
        return jest.fn().mockImplementation(mockedFetchChuckNorrisJoke)
    })

    it('returns initial state and fetches a random joke on mount', async () => {
        const mockedJoke = { id: '1', joke: 'Chuck Norris joke 1' }
        ;(fetchChuckNorrisJokes as jest.Mock).mockResolvedValueOnce(mockedJoke)

        const { result, waitForNextUpdate } = renderHook(() =>
            useChuckNorrisJokes(),
        )

        expect(result.current.jokes).toEqual([])
        expect(result.current.isLoadingJokes).toBe(true)

        await waitForNextUpdate()

        expect(fetchChuckNorrisJokes).toHaveBeenCalledTimes(1)
        expect(result.current.jokes).toEqual([mockedJoke])
        expect(result.current.isLoadingJokes).toBe(false)
    })

    it('handles joke like click and updates the state', async () => {
        const mockedJoke1 = {
            id: '1',
            value: 'Chuck Norris joke 1',
            liked: false,
        }
        const mockedJoke2 = {
            id: '2',
            value: 'Chuck Norris joke 2',
            liked: false,
        }

        const mockedJoke3 = {
            id: '3',
            joke: 'Chuck Norris joke 3',
            liked: false,
        }
        ;(fetchChuckNorrisJokes as jest.Mock).mockResolvedValueOnce(mockedJoke3)

        const { result, waitForNextUpdate } = renderHook(() =>
            useChuckNorrisJokes(),
        )

        act(() => {
            result.current.addJoke(mockedJoke1)
            result.current.addJoke(mockedJoke2)
        })

        act(() => {
            result.current.handleJokeLikeClick('1')
        })

        await waitForNextUpdate()
        expect(result.current.jokes[2].liked).toBe(true)
        mockedJoke1.liked = true
        expect(localStorage.getItem('likedJokes')).toEqual(
            JSON.stringify([mockedJoke1]),
        )

        act(() => {
            result.current.handleJokeLikeClick('2')
        })

        mockedJoke2.liked = true
        expect(result.current.jokes[1].liked).toBe(true)
        expect(localStorage.getItem('likedJokes')).toEqual(
            JSON.stringify([mockedJoke2, mockedJoke1]),
        )

        act(() => {
            result.current.handleJokeLikeClick('1')
        })

        expect(result.current.jokes[0].liked).toBe(false)
        expect(localStorage.getItem('likedJokes')).toEqual(
            JSON.stringify([mockedJoke2]),
        )
    })

    // it('loads the saved jokes on page load', async () => {
    //     const mockedJoke1 = {
    //         id: '1',
    //         value: 'Chuck Norris joke 1',
    //         liked: true,
    //     }
    //     localStorage.setItem('likedJokes', JSON.stringify([mockedJoke1]))

    //     const { result, waitForNextUpdate } = renderHook(() =>
    //         useChuckNorrisJokes(),
    //     )

    //     await waitForNextUpdate()
    //     console.log('saved jokes', result.current.jokes)
    //     expect(result.current.jokes).toEqual([mockedJoke1])
    // })
})
