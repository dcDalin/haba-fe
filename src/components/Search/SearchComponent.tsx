import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Search } from 'semantic-ui-react';
import history from '../../history';
import styles from './Search.module.scss';
import { SEARCH_USERS } from '../../GraphQl/Queries/Auth';

const SearchComponent: React.FC = () => {
  const client = useApolloClient();

  const [isLoading, setIsLoading] = useState(false);
  // Set inital state as loading for better user experience
  const [results, setResults] = useState([{ title: 'Loading...' }]);
  const [value, setValue] = useState('');

  const handleSearchChange = (e: React.SyntheticEvent<EventTarget>, { value }: any): any => {
    setIsLoading(true);
    setValue(value);

    setTimeout(async () => {
      if (value.length < 1) {
        setValue('');
        setIsLoading(false);
      }

      const res = await client.query({
        query: SEARCH_USERS,
        variables: { userName: value },
      });

      const userRes = res.data.user_searchUserName.map((item: any) => ({
        title: item.userName,
        description: item.displayName,
      }));

      setResults(userRes);
      setIsLoading(res.loading);
    }, 10);
  };

  const handleResultSelect = (event: any, { result: { title } }: any): any => {
    setValue(title);
    history.push(`/${title}`);
  };
  return (
    <Search
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      noResultsMessage="User not found &#128546;"
      size="mini"
      fluid
      className={styles.searchBar}
    />
  );
};

export default SearchComponent;
