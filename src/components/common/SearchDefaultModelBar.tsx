import { useEffect, useState, useMemo } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import Autosuggest, { RenderSuggestionsContainer } from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { defaultModelService } from '@services';

type SimpleDefaultModel = {
  id: string;
  name: string;
};

const escapeRegexCharacters = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const DesktopSearchDefaultModel: Component<{ handleSuggestionSelected?: () => void }> = ({
  handleSuggestionSelected
}) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SimpleDefaultModel[]>([]);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    return () => setValue('');
  }, []);

  const getSuggestionValue = (suggestion: SimpleDefaultModel) => suggestion.name;

  const getSuggestions = useMemo(
    () => async (value: string) => {
      const escapedValue = escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        return [];
      }
      try {
        const listModels = await defaultModelService.getAll({ keyword: value });

        return (
          listModels?.models
            .map((model) => {
              return { id: model.id, name: model.name };
            })
            .slice(0, 10) || []
        );
      } catch (err) {
        throw (err as ResponseError).message;
      }
    },
    []
  );

  const renderSuggestion = useMemo(
    () =>
      (suggestion: SimpleDefaultModel, { query }: Autosuggest.RenderSuggestionParams) => {
        const suggestionText = suggestion;
        const matches = AutosuggestHighlightMatch(suggestionText.name, query, {
          findAllOccurrences: true,
          insideWords: true
        });
        const parts = AutosuggestHighlightParse(suggestionText.name, matches);

        return (
          <div className='cursor-pointer hover:bg-gray-200 w-full px-2 py-1'>
            {parts.map((part, index) => {
              return (
                <span key={index} className={part.highlight ? 'text-red-500' : ''}>
                  {part.text}
                </span>
              );
            })}
          </div>
        );
      },
    []
  );

  const onSuggestionsFetchRequested = useMemo(
    () =>
      async ({ value }: Autosuggest.SuggestionsFetchRequestedParams) => {
        const suggestionValue = await getSuggestions(value);
        setSuggestions(suggestionValue);
      },
    [getSuggestions]
  );

  const onSuggestionSelected = (
    event: React.FormEvent<HTMLInputElement>,
    { suggestion, method }: Autosuggest.SuggestionSelectedEventData<SimpleDefaultModel>
  ) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    setValue('');
    if (handleSuggestionSelected) handleSuggestionSelected();
    navigate(`category/${suggestion.id}`);
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onChange = (_: React.FormEvent, { newValue }: Autosuggest.ChangeEvent) => {
    setValue(newValue);
  };

  const inputProps = {
    value,
    onChange
  };

  const renderInputComponent = (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className='relative h-10 w-full min-w-[200px] max-w-[800px] lg:max-w-[500px]'>
      <div className='absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500'>
        <MagnifyingGlassIcon strokeWidth={2} className='w-5 h-5' />
      </div>
      <input
        {...inputProps}
        className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-blue-gray-300 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
        placeholder=' '
      />
      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:before:border-blue-gray-300 peer-focus:after:border-blue-gray-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        Search for anything
      </label>
    </div>
  );

  const renderSuggestionsContainer: RenderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div {...containerProps} className='bg-white flex flex-col rounded-sm'>
        {children}
      </div>
    );
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      renderSuggestionsContainer={renderSuggestionsContainer}
      containerProps={{ className: 'w-full' }}
    />
  );
};

export const MobileSearchDefaultModel: Component<{ handleSuggestionSelected?: () => void }> = ({
  handleSuggestionSelected
}) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SimpleDefaultModel[]>([]);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    return () => setValue('');
  }, []);

  const getSuggestionValue = (suggestion: SimpleDefaultModel) => suggestion.name;

  const getSuggestions = useMemo(
    () => async (value: string) => {
      const escapedValue = escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        return [];
      }
      try {
        const listModels = await defaultModelService.getAll({ keyword: value });

        return (
          listModels?.models
            .map((model) => {
              return { id: model.id, name: model.name };
            })
            .slice(0, 10) || []
        );
      } catch (err) {
        throw (err as ResponseError).message;
      }
    },
    []
  );

  const renderSuggestion = useMemo(
    () =>
      (suggestion: SimpleDefaultModel, { query }: Autosuggest.RenderSuggestionParams) => {
        const suggestionText = suggestion;
        const matches = AutosuggestHighlightMatch(suggestionText.name, query, {
          findAllOccurrences: true,
          insideWords: true
        });
        const parts = AutosuggestHighlightParse(suggestionText.name, matches);

        return (
          <div className='cursor-pointer hover:bg-gray-200 w-full px-2 py-1'>
            {parts.map((part, index) => {
              return (
                <span key={index} className={part.highlight ? 'text-red-500' : ''}>
                  {part.text}
                </span>
              );
            })}
          </div>
        );
      },
    []
  );

  const onSuggestionsFetchRequested = useMemo(
    () =>
      async ({ value }: Autosuggest.SuggestionsFetchRequestedParams) => {
        const suggestionValue = await getSuggestions(value);
        setSuggestions(suggestionValue);
      },
    [getSuggestions]
  );

  const onSuggestionSelected = (
    event: React.FormEvent<HTMLInputElement>,
    { suggestion, method }: Autosuggest.SuggestionSelectedEventData<SimpleDefaultModel>
  ) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    setValue('');
    if (handleSuggestionSelected) handleSuggestionSelected();
    navigate(`category/${suggestion.id}`);
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onChange = (_: React.FormEvent, { newValue }: Autosuggest.ChangeEvent) => {
    setValue(newValue);
  };

  const inputProps = {
    value,
    onChange
  };

  const renderInputComponent = (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className='w-full flex items-center border-b-2 m-0 pb-2'>
      <div className='place-items-center text-blue-gray-500 ml-3'>
        <MagnifyingGlassIcon strokeWidth={2} className='w-5 h-5' />
      </div>
      <input
        {...inputProps}
        className='peer h-full w-full rounded-[7px] bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all disabled:bg-blue-gray-50'
        placeholder='Search for anything'
      />
    </div>
  );

  const renderSuggestionsContainer: RenderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div {...containerProps} className='bg-white flex flex-col rounded-sm ml-8'>
        {children}
      </div>
    );
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      renderSuggestionsContainer={renderSuggestionsContainer}
      containerProps={{ className: 'w-full p-0 m-0' }}
    />
  );
};
